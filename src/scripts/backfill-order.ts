import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import { ProjectModel, SkillModel } from '../models/CVData';
import { getMongoConfig } from '../lib/mongodb-config';

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

type OrderableItem = {
  _id: mongoose.Types.ObjectId;
  order?: number | null;
  enabled?: boolean | null;
};

type OrderableModel = {
  find(): {
    sort(sortBy: { _id: 1 | -1 }): {
      lean(): Promise<OrderableItem[]>;
    };
  };
  updateOne(filter: { _id: mongoose.Types.ObjectId }, update: { $set: Record<string, number | boolean> }): Promise<unknown>;
};

async function backfillCollection(
  name: 'skills' | 'projects',
  model: OrderableModel
) {
  const items = await model.find().sort({ _id: 1 }).lean();
  let updatedCount = 0;

  for (const [index, item] of items.entries()) {
    const update: Record<string, number | boolean> = {};

    if (typeof item.order !== 'number' || Number.isNaN(item.order)) {
      update.order = index;
    }

    if (typeof item.enabled !== 'boolean') {
      update.enabled = true;
    }

    if (Object.keys(update).length > 0) {
      await model.updateOne({ _id: item._id }, { $set: update });
      updatedCount += 1;
    }
  }

  console.log(`${name}: ${updatedCount} updated, ${items.length} scanned`);
}

async function run() {
  try {
    const { uri, options } = getMongoConfig();
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri, options);
    console.log('Connected to MongoDB.');

    await backfillCollection('skills', SkillModel);
    await backfillCollection('projects', ProjectModel);

    console.log('Backfill completed.');
  } catch (error) {
    console.error('Backfill failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

void run();
