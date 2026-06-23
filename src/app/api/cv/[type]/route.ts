import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { 
  ProfileModel, 
  ExperienceModel, 
  EducationModel, 
  SkillModel, 
  ProjectModel 
} from '@/models/CVData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function hasOrdering(type: string) {
  return type === 'skill' || type === 'project';
}

const getModel = (type: string) => {
  switch (type) {
    case 'profile': return ProfileModel;
    case 'experience': return ExperienceModel;
    case 'education': return EducationModel;
    case 'skill': return SkillModel;
    case 'project': return ProjectModel;
    default: return null;
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = getModel(type) as any;
    if (!model) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

    await connectToDatabase();
    
    if (type === 'profile') {
      const data = await model.findOne().lean();
      return NextResponse.json(data);
    } else {
      const query = hasOrdering(type)
        ? model.find().sort({ order: 1, _id: 1 })
        : model.find();
      const data = await query.lean();
      return NextResponse.json(data);
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = getModel(type) as any;
    if (!model) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

    const body = await req.json();
    await connectToDatabase();

    if (hasOrdering(type)) {
      if (typeof body.enabled !== 'boolean') {
        body.enabled = true;
      }

      if (typeof body.order !== 'number') {
        const lastItem = await model.findOne().sort({ order: -1, _id: -1 }).lean();
        body.order = typeof lastItem?.order === 'number' ? lastItem.order + 1 : 0;
      }
    }

    const newItem = new model(body);
    await newItem.save();
    
    return NextResponse.json(newItem);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = getModel(type) as any;
    if (!model) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

    const body = await req.json();
    const { id, ...updateData } = body;
    await connectToDatabase();

    let updated;
    if (type === 'profile') {
      updated = await model.findOneAndUpdate({}, updateData, { new: true, upsert: true });
    } else {
      if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
      updated = await model.findByIdAndUpdate(id, updateData, { new: true });
    }
    
    return NextResponse.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = getModel(type) as any;
    if (!model) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await connectToDatabase();
    await model.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = getModel(type) as any;
    if (!model || !hasOrdering(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const { items } = await req.json();
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Items array required' }, { status: 400 });
    }

    await connectToDatabase();

    const updates = items
      .filter((item) => item && typeof item.id === 'string' && typeof item.order === 'number')
      .map((item) => ({ id: item.id, order: item.order }));

    if (!updates.length) {
      return NextResponse.json({ error: 'No valid reorder items provided' }, { status: 400 });
    }

    await model.bulkWrite(
      updates.map((item) => ({
        updateOne: {
          filter: { _id: item.id },
          update: { $set: { order: item.order } },
        },
      }))
    );

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
