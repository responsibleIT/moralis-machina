export enum ScenarioType {
    YELLOW = 'De Redacteur',
    BLUE = 'De Leeshulp',
    GREEN = 'Het Orakel',
    RED = 'De Schrijver'
}

export const ScenarioColor = {
    [ScenarioType.YELLOW]: '#F1C74E',
    [ScenarioType.BLUE]: '#62BDC6',
    [ScenarioType.GREEN]: '#8EC268',
    [ScenarioType.RED]: '#E8705F'
};
