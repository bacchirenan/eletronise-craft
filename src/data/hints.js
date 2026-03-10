export const HINTS = [
    {
        requirement: (discovered) => !discovered.includes('METAL'),
        goalId: 'METAL',
        image: "/01.png",
        message: "O laboratório está vazio. Precisamos de metal para começar."
    },
    {
        requirement: (discovered) => !discovered.includes('ELECTRODES'),
        goalId: 'ELECTRODES',
        image: "/02.png",
        message: "Precisamos de dois bastões metálicos idênticos."
    },
    {
        requirement: (discovered) => !discovered.includes('WIRE'),
        goalId: 'WIRE',
        image: "/03.png",
        message: "A energia precisa de um caminho para viajar."
    },
    {
        requirement: (discovered) => !discovered.includes('SALINE_WATER'),
        goalId: 'SALINE_WATER',
        image: "/04.png",
        message: "Água pura é uma péssima condutora."
    },
    {
        requirement: (discovered) => !discovered.includes('BATTERY'),
        goalId: 'BATTERY',
        image: "/05.png",
        message: "Precisamos de um reservatório de energia química."
    },
    {
        requirement: (discovered) => !discovered.includes('ELECTROLYSIS_KIT'),
        goalId: 'ELECTROLYSIS_KIT',
        image: "/06.png",
        message: "Una as peças para criar o aparato final."
    },
    {
        requirement: (discovered) => !discovered.includes('ELECTROLYSIS_DONE'),
        goalId: 'ELECTROLYSIS_DONE',
        image: "/07.png",
        message: "O momento da verdade! O equipamento está pronto."
    },
    {
        requirement: (discovered) => discovered.includes('ELECTROLYSIS_DONE'),
        goalId: null,
        image: "/08.png",
        message: "Mestre da Eletrólise! Hidrogênio e Oxigênio libertados."
    }
];
