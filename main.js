import getUserInput from "./modules.js";
import {
    Calculator,
    convertToJson,
    saveToLocalStorage,
    getFromLocalStorage,
    isPositive,
    operateOnNumbers,
    fetchData
} from "./modules.js";


document.addEventListener("DOMContentLoaded", () => {

    const btnLoad = document.getElementById("btnLoad");
    const btnClear = document.getElementById("btnClear");
    const output = document.getElementById("output");



    btnLoad.addEventListener("click", async () => {

        const apiUrl = "https://jsonplaceholder.typicode.com/todos/";

        try {
            const fetchedData = await fetchData(apiUrl);


            let table = `
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Task ID</th>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            `;


            fetchedData.forEach(todo => {

                const status = todo.completed
                    ? "Completed"
                    : "Not yet Completed";

                const statusClass = todo.completed
                    ? "completed"
                    : "not-completed";

                table += `
                    <tr>
                        <td>${todo.userId}</td>
                        <td>${todo.id}</td>
                        <td>${todo.title}</td>
                        <td class="${statusClass}">${status}</td>
                    </tr>
                `;
            });

            table += `
                    </tbody>
                </table>
            `;


            output.innerHTML = table;

        } catch (error) {
            console.error("Error loading data:", error);
            output.innerHTML = "<p>Error loading data from API.</p>";
        }
    });


    btnClear.addEventListener("click", () => {
        output.innerHTML = "";
    });


    const number = getUserInput();

    const isPositiveNumber = isPositive(number);

    const resultAddition = Calculator.add(5, 3);
    const resultSubtraction = Calculator.subtract(10, 7);

    const jsonData = { key: "value" };
    const jsonString = convertToJson(jsonData);

    saveToLocalStorage("savedData", jsonString);
    const retrievedData = getFromLocalStorage("savedData");

    const sum = operateOnNumbers(4, 6, (a, b) => a + b);
    const difference = operateOnNumbers(8, 3, (a, b) => a - b);

    console.log("User Input:", number);
    console.log("Is Positive Number:", isPositiveNumber);
    console.log("Result Addition:", resultAddition);
    console.log("Result Subtraction:", resultSubtraction);
    console.log("JSON String:", jsonString);
    console.log("Retrieved Data from Local Storage:", retrievedData);
    console.log("Sum:", sum);
    console.log("Difference:", difference);

});