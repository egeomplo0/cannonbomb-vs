namespace SpriteKind {
    export const Effect = SpriteKind.create()
}
mp.onButtonEvent(mp.MultiplayerButton.Right, ControllerButtonEvent.Pressed, function (player2) {
    if (!(story.isMenuOpen())) {
        if (!(player2 == mp.playerSelector(mp.PlayerNumber.Two) && computerPlay == 1)) {
            if (!(mp.isButtonPressed(player2, mp.MultiplayerButton.Down))) {
                if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
                    p1LeftFacing = 0
                    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setImage(assets.image`P1FaceRight`)
                } else if (player2 == mp.playerSelector(mp.PlayerNumber.Two)) {
                    p2LeftFacing = 0
                    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setImage(assets.image`P2FaceRight`)
                }
            }
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (otherSprite == projectile) {
        if (sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))) {
            sprites.destroy(otherSprite)
            sprite.startEffect(effects.fire, 500)
            if (computerPlay == 0) {
                splitScreen.cameraShake(splitScreen.Camera.Camera2, 4, 500)
            }
            mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.life, -1)
            mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score, 100)
            music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
        }
    } else {
        if (sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One))) {
            sprites.destroy(otherSprite)
            sprite.startEffect(effects.fire, 500)
            if (computerPlay == 0) {
                splitScreen.cameraShake(splitScreen.Camera.Camera1, 4, 500)
            } else {
                scene.cameraShake(4, 500)
            }
            mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.life, -1)
            mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score, 100)
            music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
        }
    }
})
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player2) {
    if (!(story.isMenuOpen())) {
        if (!(player2 == mp.playerSelector(mp.PlayerNumber.Two) && computerPlay == 1)) {
            if (mp.getPlayerState(player2, MultiplayerState.score) >= 100) {
                mp.setPlayerState(player2, MultiplayerState.score, 0)
                if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
                    if (p1LeftFacing == 0) {
                        projectile = sprites.createProjectileFromSprite(assets.image`bombP1`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), 80, -80)
                    } else {
                        projectile = sprites.createProjectileFromSprite(assets.image`bombP1`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), -80, -80)
                    }
                    music.play(music.createSoundEffect(WaveShape.Square, 910, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                    projectile.setFlag(SpriteFlag.AutoDestroy, false)
                    projectile.ay = 200
                } else {
                    if (p2LeftFacing == 0) {
                        projectile2 = sprites.createProjectileFromSprite(assets.image`bombP2`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), 80, -80)
                    } else {
                        projectile2 = sprites.createProjectileFromSprite(assets.image`bombP2`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), -80, -80)
                    }
                    music.play(music.createSoundEffect(WaveShape.Square, 910, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                    projectile2.setFlag(SpriteFlag.AutoDestroy, false)
                    projectile2.ay = 200
                }
            }
        }
    }
})
mp.onButtonEvent(mp.MultiplayerButton.Up, ControllerButtonEvent.Pressed, function (player2) {
    if (!(story.isMenuOpen())) {
        if (!(player2 == mp.playerSelector(mp.PlayerNumber.Two) && computerPlay == 1)) {
            if (mp.getPlayerSprite(player2).isHittingTile(CollisionDirection.Bottom)) {
                mp.getPlayerSprite(player2).vy = -220
            }
        }
    }
})
mp.onLifeZero(function (player2) {
    if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
        mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.Two))
    } else {
        mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.One))
    }
})
mp.onButtonEvent(mp.MultiplayerButton.Left, ControllerButtonEvent.Pressed, function (player2) {
    if (!(story.isMenuOpen())) {
        if (!(player2 == mp.playerSelector(mp.PlayerNumber.Two) && computerPlay == 1)) {
            if (!(mp.isButtonPressed(player2, mp.MultiplayerButton.Down))) {
                if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
                    p1LeftFacing = 1
                    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setImage(assets.image`P1FaceLeft`)
                } else if (player2 == mp.playerSelector(mp.PlayerNumber.Two)) {
                    p2LeftFacing = 1
                    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setImage(assets.image`P2FaceLeft`)
                }
            }
        }
    }
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    sprites.destroy(sprite)
    if (tiles.tileAtLocationEquals(location, assets.tile`Destructible Block`)) {
        tiles.setTileAt(location, assets.tile`transparency16`)
        tiles.setWallAt(location, false)
        music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    }
})
mp.onButtonEvent(mp.MultiplayerButton.B, ControllerButtonEvent.Pressed, function (player2) {
    if (!(story.isMenuOpen())) {
        if (!(player2 == mp.playerSelector(mp.PlayerNumber.Two) && computerPlay == 1)) {
            if (mp.getPlayerState(player2, MultiplayerState.score) >= 100) {
                mp.setPlayerState(player2, MultiplayerState.score, 0)
                if (player2 == mp.playerSelector(mp.PlayerNumber.One)) {
                    projectile = sprites.createProjectileFromSprite(assets.image`bombP1`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), 0, -150)
                    music.play(music.createSoundEffect(WaveShape.Square, 886, 2430, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                    projectile.setFlag(SpriteFlag.AutoDestroy, false)
                    projectile.ay = 200
                } else {
                    projectile2 = sprites.createProjectileFromSprite(assets.image`bombP2`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), 0, -150)
                    music.play(music.createSoundEffect(WaveShape.Square, 886, 2430, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                    projectile2.setFlag(SpriteFlag.AutoDestroy, false)
                    projectile2.ay = 200
                }
            }
        }
    }
})
let projectile2: Sprite = null
let projectile: Sprite = null
let computerPlay = 0
let p2LeftFacing = 0
let p1LeftFacing = 0
p1LeftFacing = 0
p2LeftFacing = 1
story.showPlayerChoices("Computer VS", "2 Player VS")
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(assets.image`P1FaceRight`, SpriteKind.Player))
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(assets.image`P2FaceLeft`, SpriteKind.Player))
mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.life, 3)
mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.life, 3)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 80, 0)
if (story.checkLastAnswer("Computer VS")) {
    computerPlay = 1
    scene.cameraFollowSprite(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
} else if (story.checkLastAnswer("2 Player VS")) {
    computerPlay = 0
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera1, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    splitScreen.cameraFollowSprite(splitScreen.Camera.Camera2, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)))
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 80, 0)
}
tiles.setCurrentTilemap(tilemap`Stage`)
scene.setBackgroundColor(13)
tiles.placeOnTile(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), tiles.getTileLocation(4, 11))
tiles.placeOnTile(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), tiles.getTileLocation(29, 11))
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).ay = 400
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).ay = 400
forever(function () {
    if (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score) < 100) {
        mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score, 2)
    }
    if (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score) < 100) {
        mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score, 2)
    }
})
// Computer Play AI code
game.onUpdateInterval(200, function () {
    if (computerPlay == 1) {
        if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x < mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) {
            if (Math.percentChance(80)) {
                p2LeftFacing = 1
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setImage(assets.image`P2FaceLeft`)
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vx = -60
            } else {
                p2LeftFacing = 0
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setImage(assets.image`P2FaceRight`)
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vx = 60
            }
        } else {
            if (Math.percentChance(20)) {
                p2LeftFacing = 1
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setImage(assets.image`P2FaceLeft`)
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vx = -60
            } else {
                p2LeftFacing = 0
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setImage(assets.image`P2FaceRight`)
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vx = 60
            }
        }
        if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).isHittingTile(CollisionDirection.Left) || mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).isHittingTile(CollisionDirection.Right) || Math.percentChance(50)) {
            if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).isHittingTile(CollisionDirection.Bottom)) {
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vy = -220
            }
        }
        if (Math.abs(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x - mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) <= 150) {
            if (Math.percentChance(75)) {
                if (Math.abs(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x - mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x) <= 50) {
                    if (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score) >= 100) {
                        mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score, 0)
                        projectile2 = sprites.createProjectileFromSprite(assets.image`bombP2`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), 0, -150)
                        projectile2.setFlag(SpriteFlag.AutoDestroy, false)
                        projectile2.ay = 200
                    }
                } else {
                    if (mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score) >= 100) {
                        mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score, 0)
                        if (p2LeftFacing == 0) {
                            projectile = sprites.createProjectileFromSprite(assets.image`bombP2`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), 80, -80)
                        } else {
                            projectile2 = sprites.createProjectileFromSprite(assets.image`bombP2`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), -80, -80)
                        }
                        projectile2.setFlag(SpriteFlag.AutoDestroy, false)
                        projectile2.ay = 200
                    }
                }
            }
        }
    }
})
