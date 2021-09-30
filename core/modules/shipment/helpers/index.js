/* eslint-disable import/prefer-default-export */
export const optionsStatus = [
    { idValue: 'shipment_booked', name: 'Shipment Booked' },
    { idValue: 'ready_for_ship', name: 'Ready for Ship' },
    { idValue: 'process_for_shipping', name: 'Process for Shipping' },
    { idValue: 'order_delivered', name: 'Order Delivered' },
    { idValue: 'customer_picked_up', name: 'Customer Picked Up' },
    { idValue: 'closed', name: 'Closed' },
    { idValue: 'canceled', name: 'Canceled' },
];

export const dataTab = [
    { label: 'All', value: 0 },
    { label: 'Unconfirmed', value: 'true' },
    { label: 'Cannot Fulfill', value: 'cannot_fulfill' },
];
