// Código generado automáticamente. No editar.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "Stage":
            case "nivel2":return tiles.createTilemap(hex`22000e000202020202020202020202020202020202020202020202020202020202020202020202000000010000000000000000000000030400000000000000000000000100000002020000000100000000000000000000000000000000000000000000000001000000020200000001000000000000000000000000000000000000000000000000010000000202000000010000000000000000000001010101000000000000000000000100000002020000000100000000020000020000000000000000020000020000000001000000020201010102000000000100000100000000000000000100000100000000020101010202000000000000000001000001000000000000000001000001000000000000000002020000020000000000010202010000000000000000010202010000000000020000020200000000000000000000000000000000000000000000000000000000000000000202000000000000020000000000000000000000000000000000000200000000000002020200000000000000000000000002020000020200000000000000000000000002020202020000000000000000000002020200000202020000000000000000000002020202020202020202020202020202020202020202020202020202020202020202020202`, img`
2222222222222222222222222222222222
2...2........................2...2
2...2........................2...2
2...2........................2...2
2...2..........2222..........2...2
2...2....2..2........2..2....2...2
22222....2..2........2..2....22222
2........2..2........2..2........2
2..2.....2222........2222.....2..2
2................................2
2......2..................2......2
22............22..22............22
222..........222..222..........222
2222222222222222222222222222222222
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "Wall Block":
            case "tile2":return tile2;
            case "Destructible Block":
            case "tile1":return tile1;
            case "egeomplo0":
            case "tile3":return tile3;
            case "egeomplo2":
            case "tile4":return tile4;
        }
        return null;
    })

}
// Código generado automáticamente. No editar.
