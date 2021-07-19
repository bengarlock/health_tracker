
const data = [
    {
        id: 1,
        name: "GLENDA",
        status: 0,
    },
    {
        id: 2,
        name: "BEN",
        status: 0,
    }
]

const root = document.getElementById('root')

document.addEventListener("DOMContentLoaded", () => {

    const fetchPlayers = async () => {
        const response = await fetch("https://bengarlock.com/api/v1/healthtracker/players/")
        const players = await response.json()
        renderPlayers(players)
    }

    const renderPlayers = (data) => {
        data.map(player => {
            const playerDiv = document.createElement('div')
            playerDiv.className = "player"
            playerDiv.dataset.playerId = player.id
            playerDiv.innerHTML = `
                <h4>${player.name}</h4>
                <div class="status">${player.status}</div>
                <button class="decrement">-</button>
                <button class="increment">+</button>                       
            `
            root.appendChild(playerDiv)
        })
    }


    const clickHandler = () => {
        document.addEventListener("click", (e) => {
            if (e.target.className === "increment") {
                increment(e.target.parentElement)
            }
            else if (e.target.className === "decrement") {
                decrement(e.target.parentElement)
            }
        })
    }

    const increment = (data) => {
        let statusDiv = data.querySelector('.status')
        statusDiv.innerHTML = Number(statusDiv.innerHTML) + 1
        updatePlayer(data.dataset.playerId, Number(statusDiv.innerHTML))
    }

    const decrement = (data) => {
        let statusDiv = data.querySelector('.status')
        if (Number(statusDiv.innerHTML) > 0) {
            statusDiv.innerHTML = Number(statusDiv.innerHTML) - 1
            updatePlayer(data.dataset.playerId, Number(statusDiv.innerHTML))
        }
    }

    const updatePlayer = async (player, status) => {
        const data = {
            status: status

        }
        const packet = {
            method: "put",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch("https://bengarlock.com/api/v1/healthtracker/players/" + String(player) + '/', packet)
        const update = await response.json()
        console.log(update)
    }

    fetchPlayers()
    clickHandler()
})

