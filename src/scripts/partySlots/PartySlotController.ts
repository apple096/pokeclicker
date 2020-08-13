class PartySlotController {
    public static getPokemonImage(pokemon: string) {
        let pType = PokemonHelper.getPokemonByName(pokemon).id;
        return `assets/images/pokemon/${pType}.png`;
    }
    public static openPartySlotModal() {
        if (App.game.breeding.canAccess()) {
            $('#partySlotModal').modal('show');
        }
    }
}