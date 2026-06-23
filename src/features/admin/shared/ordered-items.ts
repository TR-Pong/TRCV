export interface OrderedAdminItem {
  _id?: string;
  order?: number;
  enabled?: boolean;
}

export function normalizeOrderedItems<T extends OrderedAdminItem>(items: T[]): T[] {
  return items
    .map((item, index) => ({
      ...item,
      order: typeof item.order === 'number' ? item.order : index,
      enabled: item.enabled ?? true,
    }))
    .sort((left, right) => left.order - right.order);
}

export function getNextOrder(items: OrderedAdminItem[]): number {
  return items.reduce(
    (maxOrder, item) =>
      typeof item.order === 'number' ? Math.max(maxOrder, item.order) : maxOrder,
    -1
  ) + 1;
}

export function createOrderedItem<T extends OrderedAdminItem>(
  createItem: () => T,
  items: OrderedAdminItem[]
): T {
  return {
    ...createItem(),
    order: getNextOrder(items),
    enabled: true,
  };
}

export function moveOrderedItem<T extends OrderedAdminItem>(
  items: T[],
  sourceIndex: number,
  targetIndex: number
): T[] {
  if (
    sourceIndex < 0 ||
    targetIndex < 0 ||
    sourceIndex >= items.length ||
    targetIndex >= items.length
  ) {
    return items;
  }

  const reorderedItems = [...items];
  const [movedItem] = reorderedItems.splice(sourceIndex, 1);
  reorderedItems.splice(targetIndex, 0, movedItem);

  return reorderedItems.map((item, index) => ({ ...item, order: index }));
}

export function toReorderPayload(items: OrderedAdminItem[]) {
  return items.flatMap((item) =>
    item._id ? [{ id: item._id, order: item.order ?? 0 }] : []
  );
}
