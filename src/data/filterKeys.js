export var parking = [
    {key: 'city', name: 'City'},
    {key: 'zone', name: 'Zone'},
    {key: 'plate', name: 'Plate'},
    {key: 'amount', name: 'Amount'},
    {key: 'service_fee', name: 'Service fee'},
    {key: 'parking_id', name: 'Parking ID'},
    {key: 'user', name: 'User'},
    {key: 'from', name: 'Start Date'},
    {key: 'to', name:'End Date'},
];

export var tickets_issued = [
    {key: 'city', name: 'City'},
    {key: 'zone', name: 'Zone'},
    {key: 'issued_by', name: 'Issued By'},
    // {key: 'ticket', name: 'Ticket'},
    {key: 'ticket_status', name: 'Ticket Status'},
    {key: 'plate', name: 'Plate'},
    {key: 'ticket_num', name: 'Ticket Number'},
    {key: 'issued_at', name: 'Issued At'},
    {key: 'paid_at', name: 'Paid At'},
];

export var commonOperator = [
    {key: '$eq', name: 'equal to'},
    {key: '$ne', name: 'not equal to'},
    {key: '$regex', name: 'contains'},
    {key: '$not', name: 'not contains'}
];

export var dateOperator = [
    {key: '$gte', name: 'greater than or equal'},
    {key: '$lte', name: 'less than or equal'},
    {key: '$eq', name: 'equal to'},
    {key: '$ne', name: 'not equal to'}
];

export var objectIDOperator = [
    {key: '$eq', name: 'equal to'},
    {key: '$ne', name: 'not equal to'}
];