export const RECIPES = [
    {
        ingredients: ['MINERALS', 'ENERGY'],
        result: 'METAL'
    },
    {
        ingredients: ['METAL', 'METAL'],
        result: 'ELECTRODES'
    },
    {
        ingredients: ['METAL', 'ENERGY'],
        result: 'WIRE'
    },
    {
        ingredients: ['WATER', 'MINERALS'],
        result: 'SALINE_WATER'
    },
    {
        ingredients: ['METAL', 'SALINE_WATER'],
        result: 'BATTERY'
    },
    {
        ingredients: ['WIRE', 'ELECTRODES'],
        result: 'ELECTROLYSIS_KIT'
    },

    {
        ingredients: ['ELECTROLYSIS_KIT', 'WATER'],
        result: 'ELECTROLYSIS_DONE'
    }
];

// Lógica especial para o resultado final (1 para 2)
export const SPECIAL_RESULTS = {
    'ELECTROLYSIS_DONE': ['HYDROGEN', 'OXYGEN']
};
