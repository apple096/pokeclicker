/// <reference path="../Quest.ts" />
/// <reference path="../../scripts/GameConstants.d.ts"/>

class DefeatGymQuest extends Quest implements QuestInterface {
    constructor(gymTown: string, amount: number, region: number) {
        super(amount, DefeatGymQuest.calcReward(gymTown, amount));
        this.description = DefeatGymQuest.getDescription(gymTown, amount, region);
        this.focus = App.game.statistics.gymsDefeated[GameConstants.getGymIndex(gymTown)];
    }

    private static getDescription(gymTown: string, amount: number, region: number): string {
        let desc = `Defeat ${gymList[gymTown].town} `;
        if (!gymTown.includes('Elite') && !gymTown.includes('Champion')) {
            desc += `gym in ${GameConstants.Region[region]} `;
        }
        desc += `${amount.toLocaleString('en-US')} times.`;
        return desc;
    }

    private static calcReward(gymTown: string, amount: number): number {
        const gym = gymList[gymTown];
        if (gym instanceof Champion) {
            gym.setPokemon(player.starter);
        }
        const playerDamage = App.game.party.calculatePokemonAttack();
        let attacksToWin = 0;
        for (const pokemon of gym.pokemons) {
            attacksToWin += Math.ceil( Math.min( 4, pokemon.maxHealth / Math.max(1, playerDamage) ) );
        }
        return Math.min(5000, Math.ceil(attacksToWin * GameConstants.DEFEAT_POKEMONS_BASE_REWARD * GameConstants.ACTIVE_QUEST_MULTIPLIER * amount));
    }
}
