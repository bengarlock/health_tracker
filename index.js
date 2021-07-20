
const root = document.getElementById('root')

document.addEventListener("DOMContentLoaded", () => {

    const fetchPlayers = async () => {
        const response = await fetch("https://bengarlock.com/api/v1/healthtracker/players/")
        const players = await response.json()
        renderPlayers(players)
        clickHandler()
    }

    const renderPlayers = (data) => {
        data.map(player => {

            const playerDiv = document.createElement('div')
            playerDiv.className = "player"
            playerDiv.dataset.playerId = player.id

            let meterDiv = document.createElement("div")
            meterDiv.style.position = 'relative'
            meterDiv.className = "meter"
            meterDiv.innerHTML = "X"
            meterDiv.style.left = String(Number(player.status) * 10) + "%"

            playerDiv.appendChild(meterDiv)

            playerDiv.innerHTML = `
                <h4>${player.name}</h4>
                <div class="meter" style="position: relative; left: ${String(player.status * 10) + "%"}">X</div>
                <div>Status:</div>
                <div class='status'>${player.status}</div>
                <div>Goal:</div>
                <div class="goals">${player.goal}</div>
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
        let meterDiv = data.querySelector('.meter')
        meterDiv.style.position = 'relative'
        meterDiv.style.left = String(Number(statusDiv.innerHTML) * 10) + "%"
    }

    const decrement = (data) => {
        let statusDiv = data.querySelector('.status')
        if (Number(statusDiv.innerHTML) > 0) {
            statusDiv.innerHTML = Number(statusDiv.innerHTML) - 1
            updatePlayer(data.dataset.playerId, Number(statusDiv.innerHTML))
            let meterDiv = data.querySelector('.meter')
            meterDiv.style.position = 'relative'
            meterDiv.style.left = String(Number(statusDiv.innerHTML) * 10) + "%"

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
        await fetch("https://bengarlock.com/api/v1/healthtracker/players/" + String(player) + '/', packet)
    }

    fetchPlayers()

})

