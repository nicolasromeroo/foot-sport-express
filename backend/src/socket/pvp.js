import User from '../models/user.model.js';

const salas = {};

export function setupPvpSocket(io) {
    io.on('connection', (socket) => {
        console.log(`🔌 Conectado: ${socket.id}`);

        socket.on('crear_sala', ({ username }) => {
            const salaId = Math.random().toString(36).substring(2, 8).toUpperCase();
            socket.join(salaId);
            salas[salaId] = {
                jugadores: [{ socketId: socket.id, username, jugadoresSeleccionados: [] }],
            };
            console.log(`🎯 ${username} creó la sala ${salaId}`);
            socket.emit('sala_creada', { salaId });
        });

        socket.on('unirse_sala', ({ username, salaId }) => {
            const sala = salas[salaId];
            if (!sala || sala.jugadores.length >= 2) {
                return socket.emit('error_sala', 'La sala no existe o ya está llena');
            }

            socket.join(salaId);
            sala.jugadores.push({ socketId: socket.id, username, jugadoresSeleccionados: [] });

            io.to(salaId).emit('jugadores_conectados', {
                jugadores: sala.jugadores.map(j => j.username),
            });
            io.to(salaId).emit('player_joined');
        });

        socket.on('submit_team', ({ salaId, jugadores }) => {
            if (!Array.isArray(jugadores) || jugadores.length !== 5) {
                return socket.emit('error', 'Debes seleccionar exactamente 5 jugadores');
            }

            const sala = salas[salaId];
            if (!sala) return;

            const jugador = sala.jugadores.find(j => j.socketId === socket.id);
            if (jugador) {
                jugador.jugadoresSeleccionados = jugadores;
                console.log(`✅ ${jugador.username} seleccionó sus jugadores`);

                //     if (sala.jugadores.every(j => j.jugadoresSeleccionados.length === 5)) {
                //         const [jugador1, jugador2] = sala.jugadores;

                //         io.to(jugador1.socketId).emit('opponent_team', jugador2.jugadoresSeleccionados);
                //         io.to(jugador2.socketId).emit('opponent_team', jugador1.jugadoresSeleccionados);

                //         const ganador = calcularGanador(sala.jugadores);
                //         io.to(salaId).emit('resultado_partida', {
                //             ganador: ganador.username,
                //             puntosGanados: 50,
                //         });

                //         User.findOneAndUpdate(
                //             { username: ganador.username },
                //             { $inc: { puntos: 50 } }
                //         ).then(() => console.log(`🏆 Se sumaron puntos a ${ganador.username}`));
                //     }
            }
        });

        socket.on('message', (data) => {
            if (data.message && data.message.trim() !== "") {
                messages.push({ user: socket.id, message: data.message });
                io.emit('messageLogs', messages);
            } else {
                socket.emit('errorMessage', 'El mensaje no puede estar vacío.');
            }
        });

        socket.on('typing', () => {
            socket.broadcast.emit('usuarioEscribiendo', { user: socket.id });
        });

        socket.on('disconnect', () => {
            console.log(`🔴 Desconectado: ${socket.id}`);
            for (const salaId in salas) {
                salas[salaId].jugadores = salas[salaId].jugadores.filter(j => j.socketId !== socket.id);
                if (salas[salaId].jugadores.length === 0) delete salas[salaId];
            }
        });
    });
}

function calcularGanador(jugadoresSala) {
    const [jugador1, jugador2] = jugadoresSala;

    const calcularPuntuacionEquipo = (equipo) => {
        return equipo.jugadoresSeleccionados.reduce((total, jugador) => {
            const puntuacion =
                (jugador.stats.attack * 1.3) +
                (jugador.stats.defense * 1.2) +
                (jugador.stats.speed * 1.1) +
                (jugador.stats.dribble * 1.0) +
                (jugador.stats.pass * 0.9) +
                (jugador.stats.vision * 0.8);

            const bonusRareza = {
                common: 1.0,
                rare: 1.1,
                legendary: 1.25
            };

            return total + (puntuacion * bonusRareza[jugador.rarity]);
        }, 0);
    };

    const puntuacion1 = calcularPuntuacionEquipo(jugador1);
    const puntuacion2 = calcularPuntuacionEquipo(jugador2);

    const diferenciaPorcentual = Math.abs(puntuacion1 - puntuacion2) / Math.max(puntuacion1, puntuacion2);
    if (diferenciaPorcentual < 0.02) {
        return {
            empate: true,
            puntuaciones: { [jugador1.username]: puntuacion1, [jugador2.username]: puntuacion2 }
        };
    }

    return puntuacion1 > puntuacion2 ? jugador1 : jugador2;
}
