import Language from '@/types/language';

const grammars = new Map<Language['locale'], string[]>();

grammars
    .set('es-ES', [
        'Hola',
        'Me llamo Pablo',
        'Vivo en Madrid con mi familia',
        'Tengo preparado las maletas para irme a Venecia',
    ])
    .set('fr-FR', [
        'Salut',
        'Mon nom est Pierre',
        'Je vis à Paris avec toute ma famille',
        "J'ai préparé les valises pour aller à Venise",
    ])
    .set('en-EN', [
        'Hello',
        'My name is Peter',
        'I live in London with my family',
        'I packed the bags to go to Paris',
    ]);

export default grammars;
