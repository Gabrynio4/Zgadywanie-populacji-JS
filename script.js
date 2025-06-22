let json;
        let odpElement = document.querySelector("#odp");

        let Pop1, Pop2, Name1, Name2;
        let poprawne = 0;
        let bledy = 0;
        let rekord = localStorage.getItem("rekord") ? parseInt(localStorage.getItem("rekord")) : 0;

        async function getData() {
            try {
                const response = await fetch('https://restcountries.com/v3.1/region/europe');
                json = await response.json();
                console.log("Dane zostały załadowane:");
                console.log(json);
                losowanie();
            } catch (error) {
                console.error("Wystąpił błąd podczas pobierania danych:", error);
            }
        }

        function losowanie() {
            if (bledy > 4) {
                endGame();
            } else {
                const liczb1 = Math.floor(Math.random() * json.length);
                let liczb2;
                do {
                    liczb2 = Math.floor(Math.random() * json.length);
                } while (liczb2 === liczb1);

                const Flag1 = json[liczb1].flags.png;
                Name1 = json[liczb1].name.common;
                Pop1 = json[liczb1].population;

                const Flag2 = json[liczb2].flags.png;
                Name2 = json[liczb2].name.common;
                Pop2 = json[liczb2].population;

                document.querySelector("#img1").src = Flag1;
                document.querySelector("#Name1").innerHTML = `<strong>${Name1}</strong>`;

                document.querySelector("#img2").src = Flag2;
                document.querySelector("#Name2").innerHTML = `<strong>${Name2}</strong>`;
            }
        }

        function sprawdzenie1() {
            if (Pop1 > Pop2) {
                odpElement.textContent = `Dobrze!`;
                odpElement.className = "dobre";
                poprawne++;
            } else {
                odpElement.textContent = `Źle! Poprawna odpowiedź to: ${Name2}`;
                odpElement.className = "zle";
                bledy++;
            }

            document.querySelector("#poprawne").textContent = `Poprawne: ${poprawne}`;
            document.querySelector("#bledy").textContent = `Niepoprawne: ${bledy}`;

            losowanie();
        }

        function sprawdzenie2() {
            if (Pop2 > Pop1) {
                odpElement.textContent = `Dobrze!`;
                odpElement.className = "dobre";
                poprawne++;
            } else {
                odpElement.textContent = `Źle! Poprawna odpowiedź to: ${Name1}`;
                odpElement.className = "zle";
                bledy++;
            }

            document.querySelector("#poprawne").textContent = `Poprawne: ${poprawne}`;
            document.querySelector("#bledy").textContent = `Niepoprawne: ${bledy}`;

            losowanie();
        }

        function endGame() {
            let all = poprawne + bledy;
            let precel = ((poprawne / all) * 100).toFixed(2);
            odpElement.textContent = `Przegrałeś z wynikiem ${precel} %`;

            if (poprawne > rekord) {
                rekord = poprawne;
                localStorage.setItem("rekord", rekord);
            }

            document.querySelector("#rekord").textContent = `Rekord: ${rekord}`;
            poprawne = 0;
            bledy = 0;

            document.querySelector("#poprawne").textContent = `Poprawne: ${poprawne}`;
            document.querySelector("#bledy").textContent = `Niepoprawne: ${bledy}`;

            losowanie();
        }

        getData();