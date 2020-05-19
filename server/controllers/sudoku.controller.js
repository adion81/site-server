const axios = require('axios');

function puzzle(s){
    let output = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ]
    for(var cell of s){
        output[cell.x][cell.y] = cell.value;
    }
    return output;
}
function isSafe(board,row,col,num){
    // console.log("DKFJSLFJLSDJFLSDJFLSDKFJLSDJFLSDJFLSDJKFJLFJK")
    for(let x = 0; x < board[0].length; x++){
        if (board[row][x] == num)  
        { 
            return false; 
        } 
    }
    for (let y = 0; y < board[0].length; y++) 
    { 
        // if the number we are trying to 
        // place is already present in 
        // that column, return false; 
        if (board[y][col] == num) 
        { 
            return false; 
        } 
    } 
    let sqr = Math.sqrt(9);
    // console.log("THIS is square",sqr);
    let rowStart = row - row % sqr;
    let colStart = col - col % sqr;
    for (let r = rowStart; r < rowStart + sqr; r++){ 
        for (let d = colStart; d < colStart + sqr; d++){ 
            if (board[r,d] == num)  
            { 
                return false; 
            } 
        } 
    } 
    return true;
}

function solvePuzzle(board,n){
    // console.log("Before",n)
    let row = -1;
    let col = -1;
    isEmpty = true;
    for(let i = 0; i < n; i++ ){
        for(let j = 0; j < n; j++){
            if (board[i][j] == 0)  
            { 
                row = i; 
                col = j; 
                // we still have some remaining 
                // missing values in Sudoku 
                isEmpty = false;  
                break; 
            } 
        }
        if (!isEmpty){ 
            break; 
        } 
    }
    if (isEmpty){ 
        // console.log("HELKJDLJFLDSKJFLSDJKF")
        return true; 
    } 
    for(let num = 1; num <=n; num++){
        // console.log(num);
        // console.log("**********************",isSafe(board,row,col,num));
        if(isSafe(board,row,col,num)){
            board[row][col] = num; 
            if (solvePuzzle(board, n))  
            { 
                // console.log(printSolution(board, n)); 
                return true; 
            }  
            else
            { 
                board[row] [col] = 0; // replace it 
            } 
        }
    }
    return false;
}

function printSolution(board,n){
    let output = [];
    for (let r = 0; r < n; r++){ 
        let row = [];
        for (let d = 0; d < n; d++) 
        { 
            row.push(board[r][d]); 
        }
        output.push(row);
    } 
    return output;
    
}

module.exports ={ 
    newPuzzle: (req,res) => {
        axios.get("http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=1")
        .then(response => {
            let puz = puzzle(response.data.squares);
            let sol = [...puz]
            console.log("another one")
            if(solvePuzzle(sol,9)){
                res.json({puzzle:puzzle(response.data.squares),solution:printSolution(sol,9)})
                
            }
        })
        .catch(err => console.log(err));
    }
}