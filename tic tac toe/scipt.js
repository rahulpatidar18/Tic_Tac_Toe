let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let modeRadios = document.querySelectorAll("input[name='mode']");
let turn = true; // true for playerO, false for playerX
let count = 0;
let isComputerMode = false;

const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const reset = () => {
    turn = true;
    count = 0;
    enableboxes();
    msgcontainer.classList.add("hide");
    isComputerMode = document.querySelector("input[name='mode']:checked").value === 'computer';
};

const enableboxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const disableboxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const showwinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const showdraw = () => {
    msg.innerText = `Draw, Nobody is the winner`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const checkwinner = () => {
    for (let pattern of winpattern) {
        let [pos1, pos2, pos3] = pattern;
        let pos1val = boxes[pos1].innerText;
        let pos2val = boxes[pos2].innerText;
        let pos3val = boxes[pos3].innerText;

        if (pos1val && pos1val === pos2val && pos2val === pos3val) {
            showwinner(pos1val);
            return true;
        }
    }
    return false;
};

const computerMove = () => {
    let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.innerText = "X";
        randomBox.disabled = true;
        count++;

        if (checkwinner()) return;

        if (count === 9) {
            showdraw();
        } else {
            turn = !turn;
        }
    }
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevents changing already filled boxes
        
        box.innerText = turn ? "O" : "X";
        box.disabled = true;
        count++;

        if (checkwinner()) return;

        if (count === 9) {
            showdraw();
        } else {
            turn = !turn;

            if (isComputerMode && !turn) {
                setTimeout(computerMove, 500); // Delay for computer move
            }
        }
    });
});

newbtn.addEventListener("click", reset);
resetbtn.addEventListener("click", reset);

modeRadios.forEach(radio => {
    radio.addEventListener("change", reset);
});
