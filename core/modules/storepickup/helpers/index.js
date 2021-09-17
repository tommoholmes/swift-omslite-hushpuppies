export const optionsAllocation = [
    { id: 0, name: 'unconfirmed' },
    { id: 1, name: 'confirmed' },
    { id: 2, name: 'cannot_fulfill' },
];

export const optionsStatus = [
    { id: 'process_for_shipping', name: 'Process for Shipping' },
    { id: 'process_for_pack', name: 'Process for Pack' },
    { id: 'cannot_fulfill', name: 'Canonot Fulfill' },
    { id: 'ready_for_pack', name: 'Ready for Pack' },
    { id: 'ready_for_pickup', name: 'Ready for Pickup' },
    { id: 'customer_picked_up', name: 'Customer Picked Up' },
];

export const dataTab = [
    { label: 'All', value: 0 },
    { label: 'Process for Pack', value: 'process_for_pack' },
    { label: 'Ready for Pack', value: 'ready_for_pack' },
    { label: 'Ready for Pickup', value: 'ready_for_pickup' },
    { label: 'Customer Picked Up', value: 'customer_picked_up' },
];
