class PartySlotController {
    public static getPokemonImage(pokemon: string) {
        let pType = PokemonHelper.getPokemonByName(pokemon).id;
        return `assets/images/pokemon/${pType}.png`;
    }
    public static openPartySlotModal() {
        if (App.game.breeding.canAccess()) {
            $('partyLayout').modal('show');
        }
    }
    public static getPokemonMultiplierText(pokemon: string) {
        return `x${this.getPokemonMultiplier(pokemon)}`;
    }

    public static getPokemonMultiplier(pokemon: string) {
        let pAttack = PokemonHelper.getPokemonByName(pokemon).attack;
        if (pAttack <= 150) {
            return;
        }
        return Math.max((100 + Math.round(pAttack / 100)) / 100, 1);
    }
}