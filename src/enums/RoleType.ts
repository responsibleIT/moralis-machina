export enum RoleType {
    YELLOW = 'De Redacteur',
    BLUE = 'De Leeshulp',
    GREEN = 'Het Orakel',
    RED = 'De Schrijver',
}

export const RoleColor = {
    [RoleType.YELLOW]: '#F1C74E',
    [RoleType.BLUE]: '#62BDC6',
    [RoleType.GREEN]: '#8EC268',
    [RoleType.RED]: '#E8705F',
}