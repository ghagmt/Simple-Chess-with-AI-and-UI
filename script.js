function info(message) {
	message = String(message);
	$('#info').append("<div class='message'>"+message+"</div>");
}

function draw_empty() {
	rc.clearRect(0,0,offset_x+cell*8+100,offset_y+cell*8+100);
	board = gameboard;
	for(let i = 0; i < 8; i++) {
		if(reverse_board) {
			var reversed = board.split('');
			reversed = reversed.reverse();
			var drawboard = reversed.join('');
		} else {
			var drawboard = board;
		}
		for(let j = 0; j < 8; j++) {
			if(i%2 == 0) { rc.fillStyle = (j%2 == 0) ? '#eaeaea' : '#8d8d8d'; }
			if(i%2 == 1) { rc.fillStyle = (j%2 == 0) ? '#8d8d8d' : '#eaeaea'; }
			rc.fillRect(offset_x+j*cell, offset_y+i*cell, cell, cell);
		}
	}
}

function draw(board) {
	for(let i = 0; i < 8; i++) {
		if(reverse_board) {
			var reversed = board.split('');
			reversed = reversed.reverse();
			var drawboard = reversed.join('');
		} else {
			var drawboard = board;
		}
		for(let j = 0; j < 8; j++) {
			if(i%2 == 0) { rc.fillStyle = (j%2 == 0) ? white_cell : black_cell; }
			if(i%2 == 1) { rc.fillStyle = (j%2 == 0) ? black_cell : white_cell; }
			rc.fillRect(offset_x+j*cell, offset_y+i*cell, cell, cell);
		}
	}
	rc.clearRect(offset_x, offset_y+cell*8, cell*8, 50);
	rc.clearRect(offset_x+cell*8, offset_y, 50, cell*8);
	if(reverse_board) {
		for(let i = 0; i < 8; i++) {
			rc.textBaseline = 'top';
			rc.textAlign = "left";
			rc.font = '25px Comic Sans MS';
			rc.fillStyle = '#242424';
			rc.fillText(8-i, offset_x+8*cell+16, offset_y+i*cell+15);
		}
		for(let i = 0; i < 8; i++) {
			rc.textBaseline = 'top';
			rc.textAlign = "left";
			rc.font = '25px Comic Sans MS';
			rc.fillStyle = '#242424';
			if(i == 7) {
				rc.fillText('H', offset_x+i*cell+20, offset_y+8*cell+16);
			} else if(i == 6) {
				rc.fillText('G', offset_x+i*cell+20, offset_y+8*cell+16);
			} else if(i == 5) {
				rc.fillText('F', offset_x+i*cell+20, offset_y+8*cell+16);
			} else if(i == 4) {
				rc.fillText('E', offset_x+i*cell+20, offset_y+8*cell+16);
			} else if(i == 3) {
				rc.fillText('D', offset_x+i*cell+20, offset_y+8*cell+16);
			} else if(i == 2) {
				rc.fillText('C', offset_x+i*cell+20, offset_y+8*cell+16);
			} else if(i == 1) {
				rc.fillText('B', offset_x+i*cell+20, offset_y+8*cell+16);
			} else if(i == 0) {
				rc.fillText('A', offset_x+i*cell+20, offset_y+8*cell+16);
			}
		}
	} else {
		for(let i = 0; i < 8; i++) {
			rc.textBaseline = 'top';
			rc.textAlign = "left";
			rc.font = '25px Comic Sans MS';
			rc.fillStyle = '#242424';
			rc.fillText(i+1, offset_x+8*cell+10, offset_y+i*cell+15);
		}
		for(let i = 0; i < 8; i++) {
			rc.textBaseline = 'top';
			rc.textAlign = "left";
			rc.font = '25px Comic Sans MS';
			rc.fillStyle = '#242424';
			if(i == 0) {
				rc.fillText('H', offset_x+i*cell+20, offset_y+8*cell+5);
			} else if(i == 1) {
				rc.fillText('G', offset_x+i*cell+20, offset_y+8*cell+5);
			} else if(i == 2) {
				rc.fillText('F', offset_x+i*cell+20, offset_y+8*cell+5);
			} else if(i == 3) {
				rc.fillText('E', offset_x+i*cell+20, offset_y+8*cell+5);
			} else if(i == 4) {
				rc.fillText('D', offset_x+i*cell+20, offset_y+8*cell+5);
			} else if(i == 5) {
				rc.fillText('C', offset_x+i*cell+20, offset_y+8*cell+5);
			} else if(i == 6) {
				rc.fillText('B', offset_x+i*cell+20, offset_y+8*cell+5);
			} else if(i == 7) {
				rc.fillText('A', offset_x+i*cell+20, offset_y+8*cell+5);
			}
		}
	}
	
	for(let i = 0; i < 64; i++) {
		if(drawboard[i] == '0') { continue; }
		var x = toX(i);
		var y = toY(i);
		drawPiece(drawboard[i], x, y);
	}
	rc.strokeStyle = board_border;
	rc.lineWidth = '8';
	rc.strokeRect(offset_x-4, offset_y-4, size+8, size+8);
	rc.lineWidth = '1';
}

function drawPiece(type, x, y) {
	x = x*cell+offset_x;
	y = y*cell+offset_y;
	if(type == type.toLowerCase()) {
		rc.fillStyle = black_piece;
	} else if(type == type.toUpperCase()) {
		rc.fillStyle = white_piece;
	}
	type = type.toLowerCase();
	switch(type) {
		case 'p':
		rc.beginPath();
		rc.moveTo(x+cell/24*17, y+cell/6*5);
		rc.lineTo(x+cell/24*7, y+cell/6*5);
		rc.lineTo(x+cell/12*5, y+cell/12*6);
		rc.lineTo(x+cell/24*9, y+cell/12*3);
		rc.lineTo(x+cell/24*15, y+cell/12*3);
		rc.lineTo(x+cell/12*7, y+cell/12*6);
		rc.closePath();
		rc.fill();
		rc.strokeStyle = 'black';
		rc.stroke();
		return;
		case 'n':
		rc.beginPath();
		rc.moveTo(x+cell/6*5, y+cell/6*5);
		rc.lineTo(x+cell/6*1, y+cell/6*5);
		rc.lineTo(x+cell/6*2, y+cell/6*4);
		rc.lineTo(x+cell/24*9, y+cell/24*9);
		rc.lineTo(x+cell/12*3, y+cell/6*3);
		rc.lineTo(x+cell/12*3, y+cell/6*1);
		rc.lineTo(x+cell/12*7, y+cell/12*3);
		rc.lineTo(x+cell/6*4, y+cell/6*4);
		rc.closePath();
		rc.fill();
		rc.strokeStyle = 'black';
		rc.stroke();
		return;
		case 'r':
		rc.beginPath();
		rc.moveTo(x+cell/6*5, y+cell/6*5);
		rc.lineTo(x+cell/6*1, y+cell/6*5);
		rc.lineTo(x+cell/12*3, y+cell/6*1);
		rc.lineTo(x+cell/12*4, y+cell/12*3);
		rc.lineTo(x+cell/12*5, y+cell/12*2);
		rc.lineTo(x+cell/12*6, y+cell/12*3);
		rc.lineTo(x+cell/12*7, y+cell/12*2);
		rc.lineTo(x+cell/12*8, y+cell/12*3);
		rc.lineTo(x+cell/12*9, y+cell/12*2);
		rc.closePath();
		rc.fill();
		rc.strokeStyle = 'black';
		rc.stroke();
		return;
		case 'b':
		rc.beginPath();
		rc.moveTo(x+cell/12*9, y+cell/6*5);
		rc.lineTo(x+cell/12*3, y+cell/6*5);
		rc.lineTo(x+cell/24*10, y+cell/6*4);
		rc.lineTo(x+cell/24*11, y+cell/24*11);
		rc.lineTo(x+cell/24*9, y+cell/12*4);
		rc.lineTo(x+cell/24*12, y+cell/24*3);
		rc.lineTo(x+cell/24*15, y+cell/12*4);
		rc.lineTo(x+cell/24*13, y+cell/24*11);
		rc.lineTo(x+cell/24*14, y+cell/6*4);
		rc.closePath();
		rc.fill();
		rc.strokeStyle = 'black';
		rc.stroke();
		return;
		case 'q':
		rc.beginPath();
		rc.moveTo(x+cell/12*9, y+cell/6*5);
		rc.lineTo(x+cell/12*3, y+cell/6*5);
		rc.lineTo(x+cell/12*5, y+cell/6*4);
		rc.lineTo(x+cell/24*11, y+cell/12*4);
		rc.lineTo(x+cell/24*9, y+cell/24*8);
		rc.lineTo(x+cell/46*18, y+cell/24*6);
		rc.lineTo(x+cell/24*9, y+cell/12*2);
		rc.lineTo(x+cell/24*12, y+cell/12*1);
		rc.lineTo(x+cell/24*15, y+cell/12*2);
		rc.lineTo(x+cell/46*28, y+cell/24*6);
		rc.lineTo(x+cell/24*15, y+cell/24*8);
		rc.lineTo(x+cell/24*13, y+cell/12*4);
		rc.lineTo(x+cell/12*7, y+cell/6*4);
		rc.closePath();
		rc.fill();
		rc.strokeStyle = 'black';
		rc.stroke();
		return;
		case 'k':
		rc.beginPath();
		rc.moveTo(x+cell/12*9, y+cell/6*5);
		rc.lineTo(x+cell/12*3, y+cell/6*5);
		rc.lineTo(x+cell/12*5, y+cell/6*4);
		rc.lineTo(x+cell/24*11, y+cell/12*4);
		rc.lineTo(x+cell/24*8, y+cell/12*2);
		rc.lineTo(x+cell/24*11, y+cell/12*2);
		rc.lineTo(x+cell/24*10, y+cell/12*1);
		rc.lineTo(x+cell/24*14, y+cell/12*1);
		rc.lineTo(x+cell/24*13, y+cell/12*2);
		rc.lineTo(x+cell/24*16, y+cell/12*2);
		rc.lineTo(x+cell/24*13, y+cell/12*4);
		rc.lineTo(x+cell/12*7, y+cell/6*4);
		rc.closePath();
		rc.fill();
		rc.strokeStyle = 'black';
		rc.stroke();
		return;
	}
}

function toX(i, index = true) {
	if(index) {
		return i%8;
	} else {
		switch(i%8) {
			case 0:
				return 'h';
			case 1:
				return 'g';
			case 2:
				return 'f';
			case 3:
				return 'e';
			case 4:
				return 'd';
			case 5:
				return 'c';
			case 6:
				return 'b';
			case 7:
				return 'a';
		}
	}
}

function toY(i, index = true) {
	return (index) ? Math.floor(i/8) : Math.floor(i/8) + 1;
}

function dif(n1,n2) {
	return Math.abs(n1 - n2);
}

function getColorOfPiece(board, i) {
	if(i < 0 || i > 63) { return false; }
	if(board[i] == '0') { return false; }
	if(board[i] == 'p' ||
	board[i] == 'n' ||
	board[i] == 'b' ||
	board[i] == 'r' ||
	board[i] == 'q' ||
	board[i] == 'k') {
		return b;
	} else {
		return w;
	}
}

function getBestMove(board, side, deep = 2) {
	var mvs = getValidMoves(board, side);
	if(mvs.length == 0) { return false; }
	if(side == w) {
		var enemy_side = b;
	} else if(side == b) {
		var enemy_side = w;
	} else {
		return false;
	}
	let high = -100;
	let options = [];
	for(let i = 0; i < mvs.length; i++) {
		let branch = getBoardAfterMove(board, mvs[i][0], mvs[i][1]);
		if(deep) {
			let en_move = getBestMove(branch, enemy_side, deep-1);
			let branch2 = getBoardAfterMove(branch, en_move[0], en_move[1]);
			var points = countPoints(branch2, side);
			if(deep == 2) console.log(toX(mvs[i][1], false) + "/" + toY(mvs[i][1], false) + ": " + points);
		} else {
			var points = countPoints(branch, side);
		}
		if(points > high) {
			high = points;
			options = [];
			options[0] = i;
		} else if(points == high) {
			options.push(i);
		}
	}
	if(deep == 2) console.log('\n');
	if(options.length > 1) {
		let final = [];
		let high = 0;
		for(let i = 0; i < options.length; i++) {
			let branch = getBoardAfterMove(board, mvs[options[i]][0], mvs[options[i]][1]);
			let possible_moves = getValidMoves(branch, side).length;
			if(possible_moves > high) {
				high = possible_moves;
				final = [];
				final[0] = options[i];
			} else if(possible_moves == high) {
				final.push(options[i]);
			}
		}
		return mvs[final[Math.floor(Math.random()*final.length)]];
	} else {
		return mvs[options[0]];
	}
}

function botMove() {
	var best = getBestMove(gameboard, bot_side, depth-1);
	if(best === false) {
		info('Check & Mate. Human wins.');
		return;
	}
	if(getColorOfPiece(gameboard, best[1]) == false) {
		game_history.push([best[0], best[1]]);
	} else {
		game_history.push([best[0], best[1], gameboard[best[1]]]);
	}
	gameboard = getBoardAfterMove(gameboard, best[0], best[1]);
	if(bot_side == b) {
		info('...' + gameboard[best[1]].toUpperCase() + toX(best[0], false) + toY(best[0], false) + '—' + toX(best[1], false) + toY(best[1], false));
	} else {
		info(gameboard[best[1]].toUpperCase() + toX(best[0], false) + toY(best[0], false) + '—' + toX(best[1], false) + toY(best[1], false));
	}
	draw(gameboard);
	if(getValidMoves(gameboard, human_side).length == 0) {
		info('Check & Mate. Computer wins.');
		move_to = false;
		return;
	} else {
		move_to = human_side;
		return;
	}
}

function getBoardAfterMove(board, i1, i2) {
	var newboard = board.substring(0, i1) + '0' + board.substring(i1+1);
	newboard = newboard.substring(0, i2) + board[i1] + newboard.substring(i2+1);
	for(let i = 56; i < 64; i++) {
		if(newboard[i] == 'P') {
			newboard = newboard.substring(0, i) + 'Q' + newboard.substring(i+1);
			break;
		}
	}
	for(let i = 0; i < 8; i++) {
		if(newboard[i] == 'p') {
			newboard = newboard.substring(0, i) + 'q' + newboard.substring(i+1);
			break;
		}
	}
	if(board[i1] === 'P' && ((i2 - i1) == 9 || (i2 - i1) == 7)) {
		if(board[i2] == '0') {
			let excess_pawn_i = game_history[game_history.length-1][1];
			newboard = newboard.substring(0, excess_pawn_i) + '0' + newboard.substring(excess_pawn_i+1);
		}
	}
	if(board[i1] === 'p' && ((i2 - i1) == -9 || (i2 - i1) == -7)) {
		if(board[i2] == '0') {
			let excess_pawn_i = game_history[game_history.length-1][1];
			newboard = newboard.substring(0, excess_pawn_i) + '0' + newboard.substring(excess_pawn_i+1);
		}
	}
	if(board[i1] === 'K' && dif(toX(i1), toX(i2)) > 1) {
		if(i1 > i2) {
			newboard = getBoardAfterMove(newboard, 0, 2);
		}
		if(i1 < i2) {
			newboard = getBoardAfterMove(newboard, 7, 4);
		}
	}
	if(board[i1] === 'k' && dif(toX(i1), toX(i2)) > 1) {
		if(i1 > i2) {
			newboard = getBoardAfterMove(newboard, 56, 58);
		}
		if(i1 < i2) {
			newboard = getBoardAfterMove(newboard, 63, 60);
		}
	}
	return newboard;
}

function countPoints(board, side) {
	var points = 0;
	var pieces = (side == w) ? 'PNBRQ' : 'pnbrq';
	for(let i = 0; i < board.length; i++) {
		if(board[i] == pieces[0]) {
			points += 1;
			continue;
		}
		if(board[i] == pieces[1]) {
			points += 3;
			continue;
		}
		if(board[i] == pieces[2]) {
			points += 3;
			continue;
		}
		if(board[i] == pieces[3]) {
			points += 5;
			continue;
		}
		if(board[i] == pieces[4]) {
			points += 9;
			continue;
		}
	}
	var enemy_points = 0;
	var enemy_pieces = (side == b) ? 'PNBRQ' : 'pnbrq';
	for(let i = 0; i < board.length; i++) {
		if(board[i] == enemy_pieces[0]) {
			enemy_points += 1;
			continue;
		}
		if(board[i] == enemy_pieces[1]) {
			enemy_points += 3;
			continue;
		}
		if(board[i] == enemy_pieces[2]) {
			enemy_points += 3;
			continue;
		}
		if(board[i] == enemy_pieces[3]) {
			enemy_points += 5;
			continue;
		}
		if(board[i] == enemy_pieces[4]) {
			enemy_points += 9;
			continue;
		}
	}
	points -= enemy_points;
	var enemy_side = (side == w) ? b : w;
	var is_check = isCheck(board, enemy_side);
	if(is_check == 'check') {
		points += 2;
	} else if(is_check == 'mate') {
		points += 30;
	}
	is_check = isCheck(board, side);
	if(is_check == 'check') {
		points -= 2;
	} else if(is_check == 'mate') {
		points -= 30;
	}
	return points;
}

function isCheck(board, side, deep = true) {
	var check_flag = false;
	if(side == w) {
		var enemy_moves_arr = getValidMoves(board, b, false);
		var king_i = board.indexOf('K');
	} else if(side == b) {
		var enemy_moves_arr = getValidMoves(board, w, false);
		var king_i = board.indexOf('k');
	}
	for(let i = 0; i < enemy_moves_arr.length; i++) {
		if(enemy_moves_arr[i][1] == king_i) {
			var check_flag = true;
			break;
		}
	}
	if(check_flag) {
		if(deep == false) { return 'check'; }
		var moves_arr = getValidMoves(board, side);
		for(let i = 0; i < moves_arr.length; i++) {
			let copy = getBoardAfterMove(board, moves_arr[i][0], moves_arr[i][1]);
			if(isCheck(copy, side, false) === false) {
				return 'check';
			}
		}
		return 'mate';
	} else {
		return false;
	}
}

function isMoveValid(board, i1, i2) {
	if(i1 > 63 || i1 < 0) { return false; }
	if(i2 > 63 || i2 < 0) { return false; }
	if(getColorOfPiece(board, i1) == getColorOfPiece(board, i2)) { return false; }
	var valid_arr = getValidMoves(board, getColorOfPiece(board, i1));
	for(let i = 0; i < valid_arr.length; i++) {
		if(valid_arr[i][0] == i1 && valid_arr[i][1] == i2) {
			return true;
		}
	}
	return false;
}

function getValidMoves(board, side, deep = true) {
	var mvs = [];
	if(side == w) {
		for(let i = 0; i < 64; i++) {
			if(board[i] == '0') { continue; }
			let x = i%8;
			let y = Math.floor(i/8);
			switch(board[i]) {
				case 'P':
if(y == 1) {
	if(board[i+8] == '0') {
		mvs.push([i,i+8]);
		if(board[i+16] == '0') {
			mvs.push([i,i+16]);
		}
	}
} else if(y < 7) {
	if(board[i+8] == '0') {
		mvs.push([i,i+8]);
	}
}
if(x > 0 && y < 7) {
	if(getColorOfPiece(board, i+7) == b) {
		mvs.push([i,i+7]);
	} else if(getColorOfPiece(board, i+7) == false && game_history.length > 0) {
		if((game_history[game_history.length-1][0] == i+15) && 
		(game_history[game_history.length-1][1] == i-1) && 
		(board[i-1] == 'p'))  {
			mvs.push([i,i+7]);
		}
	}
}
if(x < 7 && y < 7) {
	if(getColorOfPiece(board, i+9) == b) {
		mvs.push([i,i+9]);
	} else if(getColorOfPiece(board, i+9) == false && game_history.length > 0) {
		if((game_history[game_history.length-1][0] == i+17) && 
		(game_history[game_history.length-1][1] == i+1) && 
		(board[i+1] == 'p'))  {
			mvs.push([i,i+9]);
		}
	}
}
				break;
				case 'N':
if( (i-6 >= 0) &&
(getColorOfPiece(board, i-6) != w) &&
(dif(x, toX(i-6)) < 3)
) {
	mvs.push([i,i-6]);
}
if( (i-10 >= 0) &&
(getColorOfPiece(board, i-10) != w) &&
(dif(x, toX(i-10)) < 3)
) {
	mvs.push([i,i-10]);
}
if( (i-15 >= 0) &&
(getColorOfPiece(board, i-15) != w) &&
(dif(x, toX(i-15)) < 3)
) {
	mvs.push([i,i-15]);
}
if( (i-17 >= 0) &&
(getColorOfPiece(board, i-17) != w) &&
(dif(x, toX(i-17)) < 3)
) {
	mvs.push([i,i-17]);
}
if( (i+6 < 64) &&
(getColorOfPiece(board, i+6) != w) &&
(dif(x, toX(i+6)) < 3)
) {
	mvs.push([i,i+6]);
}
if( (i+10 < 64) &&
(getColorOfPiece(board, i+10) != w) &&
(dif(x, toX(i+10)) < 3)
) {
	mvs.push([i,i+10]);
}
if( (i+15 < 64) &&
(getColorOfPiece(board, i+15) != w) &&
(dif(x, toX(i+15)) < 3)
) {
	mvs.push([i,i+15]);
}
if( (i+17 < 64) &&
(getColorOfPiece(board, i+17) != w) &&
(dif(x, toX(i+17)) < 3)
) {
	mvs.push([i,i+17]);
}
				break;
				case 'B':
for(let j = 1; j <= x; j++) {
	if(i-9*j >= 0 && getColorOfPiece(board, i-9*j) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-9*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-9*j]); }
		} else {
			mvs.push([i,i-9*j]);
		}
	}
}
for(let j = 1; j <= (7-x); j++) {
	if(i-7*j >= 0 && getColorOfPiece(board, i-7*j) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-7*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-7*j]); }
		} else {
			mvs.push([i,i-7*j]);
		}
	}
}
for(let j = 1; j <= x; j++) {
	if(i+7*j < 64 && getColorOfPiece(board, i+7*j) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+7*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+7*j]); }
		} else {
			mvs.push([i,i+7*j]);
		}
	}
}
for(let j = 1; j <= (7-x); j++) {
	if(i+9*j < 64 && getColorOfPiece(board, i+9*j) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+9*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+9*j]); }
		} else {
			mvs.push([i,i+9*j]);
		}
	}
}
				break;
				case 'R':
for(let j = 1; j <= x; j++) {
	if(getColorOfPiece(board, i-j) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-j]); }
		} else {
			mvs.push([i,i-j]);
		}
	}
}
for(let j = 1; j <= (7-x); j++) {
	if(getColorOfPiece(board, i+j) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+j]); }
		} else {
			mvs.push([i,i+j]);
		}
	}
}
for(let j = 1; j <= y; j++) {
	if(getColorOfPiece(board, i-j*8) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-k*8) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-j*8]); }
		} else {
			mvs.push([i,i-j*8]);
		}
	}
}
for(let j = 1; j <= (7-y); j++) {
	if(getColorOfPiece(board, i+j*8) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+k*8) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+j*8]); }
		} else {
			mvs.push([i,i+j*8]);
		}
	}
}
				break;
				case 'Q':
for(let j = 1; j <= x; j++) {
	if(getColorOfPiece(board, i-j) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-j]); }
		} else {
			mvs.push([i,i-j]);
		}
	}
}
for(let j = 1; j <= (7-x); j++) {
	if(getColorOfPiece(board, i+j) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+j]); }
		} else {
			mvs.push([i,i+j]);
		}
	}
}
for(let j = 1; j <= y; j++) {
	if(getColorOfPiece(board, i-j*8) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-k*8) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-j*8]); }
		} else {
			mvs.push([i,i-j*8]);
		}
	}
}
for(let j = 1; j <= (7-y); j++) {
	if(getColorOfPiece(board, i+j*8) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+k*8) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+j*8]); }
		} else {
			mvs.push([i,i+j*8]);
		}
	}
}
for(let j = 1; j <= x; j++) {
	if(i-9*j >= 0 && getColorOfPiece(board, i-9*j) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-9*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-9*j]); }
		} else {
			mvs.push([i,i-9*j]);
		}
	}
}
for(let j = 1; j <= (7-x); j++) {
	if(i-7*j >= 0 && getColorOfPiece(board, i-7*j) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-7*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-7*j]); }
		} else {
			mvs.push([i,i-7*j]);
		}
	}
}
for(let j = 1; j <= x; j++) {
	if(i+7*j < 64 && getColorOfPiece(board, i+7*j) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+7*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+7*j]); }
		} else {
			mvs.push([i,i+7*j]);
		}
	}
}
for(let j = 1; j <= (7-x); j++) {
	if(i+9*j < 64 && getColorOfPiece(board, i+9*j) != w) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+9*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+9*j]); }
		} else {
			mvs.push([i,i+9*j]);
		}
	}
}
				break;
				case 'K':
if(i-7 >= 0 && getColorOfPiece(board, i-7) != w) {
	if(dif(x, toX(i-7)) < 2) {
		mvs.push([i,i-7]);
	}
}
if(i-8 >= 0 && getColorOfPiece(board, i-8) != w) {
	if(dif(x, toX(i-8)) < 2) {
		mvs.push([i,i-8]);
	}
}
if(i-9 >= 0 && getColorOfPiece(board, i-9) != w) {
	if(dif(x, toX(i-9)) < 2) {
		mvs.push([i,i-9]);
	}
}
if(i-1 >= 0 && getColorOfPiece(board, i-1) != w) {
	if(dif(x, toX(i-1)) < 2) {
		mvs.push([i,i-1]);
	}
}
if(i+7 < 64 && getColorOfPiece(board, i+7) != w) {
	if(dif(x, toX(i+7)) < 2) {
		mvs.push([i,i+7]);
	}
}
if(i+8 < 64 && getColorOfPiece(board, i+8) != w) {
	if(dif(x, toX(i+8)) < 2) {
		mvs.push([i,i+8]);
	}
}
if(i+9 < 64 && getColorOfPiece(board, i+9) != w) {
	if(dif(x, toX(i+9)) < 2) {
		mvs.push([i,i+9]);
	}
}
if(i+1 < 64 && getColorOfPiece(board, i+1) != w) {
	if(dif(x, toX(i+1)) < 2) {
		mvs.push([i,i+1]);
	}
}
if(i == 3 && deep) {
	let castling = true;
	let long_castling = true;
	let short_castling = true;
	if(game_history.length > 1) {
		for(let j = 0; j < game_history.length; j++) {
			if(j%2 == 0) {
				if(game_history[j][0] == 3) {
					castling = false;
					break;
				}
				if(game_history[j][0] == 0) {
					short_castling = false;
				}
				if(game_history[j][0] == 7) {
					long_castling = false;
				}
			}
		}
	} else {
		castling = false;
	}
	if(castling) {
		if(short_castling) {
			if(getColorOfPiece(board, i-1) == '0' && getColorOfPiece(board, i-2) == '0') {
				let halfway = getBoardAfterMove(board, i, i-1);
				if(isCheck(board, side, false) == false && isCheck(halfway, side, false) == false) {
					mvs.push([i,i-2]);
				}
			}
		}
		if(long_castling) {
			if(getColorOfPiece(board, i+1) == '0' && getColorOfPiece(board, i+2) == '0' && getColorOfPiece(board, i+3) == '0') {
				let halfway = getBoardAfterMove(board, i, i+1);
				if(isCheck(board, side, false) == false && isCheck(halfway, side, false) == false) {
					mvs.push([i,i+2]);
				}
			}
		}
	}
}
			}
		}
		if(!deep) {
			return mvs;
		} else {
			var deep_mvs = [];
			for(let i = 0; i < mvs.length; i++) {
				let copy = getBoardAfterMove(board, mvs[i][0], mvs[i][1]);
				if(!isCheck(copy, side, false)) {
					deep_mvs.push(mvs[i]);
				}
			}
			return deep_mvs;
		}
	} else if(side == b) {
		for(let i = 0; i < 64; i++) {
			if(board[i] == '0') { continue; }
			let x = i%8;
			let y = Math.floor(i/8);
			switch(board[i]) {
				case 'p':
if(y == 6) {
	if(board[i-8] == '0') {
		mvs.push([i,i-8]);
		if(board[i-16] == '0') {
			mvs.push([i,i-16]);
		}
	}
} else if(y > 0) {
	if(board[i-8] == '0') {
		mvs.push([i,i-8]);
	}
}
if(x < 7 && y > 0) {
	if(getColorOfPiece(board, i-7) == w) {
		mvs.push([i,i-7]);
	} else if(getColorOfPiece(board, i-7) == false && game_history.length > 0) {
		if((game_history[game_history.length-1][0] == i-15) && 
		(game_history[game_history.length-1][1] == i+1) && 
		(board[i+1] == 'P'))  {
			mvs.push([i,i-7]);
		}
	}
}
if(x > 0 && y > 0) {
	if(getColorOfPiece(board, i-9) == w) {
		mvs.push([i,i-9]);
	} else if(getColorOfPiece(board, i-9) == false && game_history.length > 0) {
		if((game_history[game_history.length-1][0] == i-17) && 
		(game_history[game_history.length-1][1] == i-1) && 
		(board[i-1] == 'P'))  {
			mvs.push([i,i-9]);
		}
	}
}
				break;
				case 'n':
if( (i-6 >= 0) &&
(getColorOfPiece(board, i-6) != b) &&
(dif(x, toX(i-6)) < 3)
) {
	mvs.push([i,i-6]);
}
if( (i-10 >= 0) &&
(getColorOfPiece(board, i-10) != b) &&
(dif(x, toX(i-10)) < 3)
) {
	mvs.push([i,i-10]);
}
if( (i-15 >= 0) &&
(getColorOfPiece(board, i-15) != b) &&
(dif(x, toX(i-15)) < 3)
) {
	mvs.push([i,i-15]);
}
if( (i-17 >= 0) &&
(getColorOfPiece(board, i-17) != b) &&
(dif(x, toX(i-17)) < 3)
) {
	mvs.push([i,i-17]);
}
if( (i+6 < 64) &&
(getColorOfPiece(board, i+6) != b) &&
(dif(x, toX(i+6)) < 3)
) {
	mvs.push([i,i+6]);
}
if( (i+10 < 64) &&
(getColorOfPiece(board, i+10) != b) &&
(dif(x, toX(i+10)) < 3)
) {
	mvs.push([i,i+10]);
}
if( (i+15 < 64) &&
(getColorOfPiece(board, i+15) != b) &&
(dif(x, toX(i+15)) < 3)
) {
	mvs.push([i,i+15]);
}
if( (i+17 < 64) &&
(getColorOfPiece(board, i+17) != b) &&
(dif(x, toX(i+17)) < 3)
) {
	mvs.push([i,i+17]);
}
				break;
				case 'b':
for(let j = 1; j <= x; j++) {
	if(i-9*j >= 0 && getColorOfPiece(board, i-9*j) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-9*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-9*j]); }
		} else {
			mvs.push([i,i-9*j]);
		}
	}
}
for(let j = 1; j <= (7-x); j++) {
	if(i-7*j >= 0 && getColorOfPiece(board, i-7*j) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-7*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-7*j]); }
		} else {
			mvs.push([i,i-7*j]);
		}
	}
}
for(let j = 1; j <= x; j++) {
	if(i+7*j < 64 && getColorOfPiece(board, i+7*j) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+7*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+7*j]); }
		} else {
			mvs.push([i,i+7*j]);
		}
	}
}
for(let j = 1; j <= (7-x); j++) {
	if(i+9*j < 64 && getColorOfPiece(board, i+9*j) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+9*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+9*j]); }
		} else {
			mvs.push([i,i+9*j]);
		}
	}
}
				break;
				case 'r':
for(let j = 1; j <= x; j++) {
	if(getColorOfPiece(board, i-j) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-j]); }
		} else {
			mvs.push([i,i-j]);
		}
	}
}
for(let j = 1; j <= (7-x); j++) {
	if(getColorOfPiece(board, i+j) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+j]); }
		} else {
			mvs.push([i,i+j]);
		}
	}
}
for(let j = 1; j <= y; j++) {
	if(getColorOfPiece(board, i-j*8) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-k*8) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-j*8]); }
		} else {
			mvs.push([i,i-j*8]);
		}
	}
}
for(let j = 1; j <= (7-y); j++) {
	if(getColorOfPiece(board, i+j*8) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+k*8) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+j*8]); }
		} else {
			mvs.push([i,i+j*8]);
		}
	}
}
				break;
				case 'q':
for(let j = 1; j <= x; j++) {
	if(getColorOfPiece(board, i-j) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-j]); }
		} else {
			mvs.push([i,i-j]);
		}
	}
}
for(let j = 1; j <= (7-x); j++) {
	if(getColorOfPiece(board, i+j) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+j]); }
		} else {
			mvs.push([i,i+j]);
		}
	}
}
for(let j = 1; j <= y; j++) {
	if(getColorOfPiece(board, i-j*8) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-k*8) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-j*8]); }
		} else {
			mvs.push([i,i-j*8]);
		}
	}
}
for(let j = 1; j <= (7-y); j++) {
	if(getColorOfPiece(board, i+j*8) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+k*8) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+j*8]); }
		} else {
			mvs.push([i,i+j*8]);
		}
	}
}
for(let j = 1; j <= x; j++) {
	if(i-9*j >= 0 && getColorOfPiece(board, i-9*j) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-9*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-9*j]); }
		} else {
			mvs.push([i,i-9*j]);
		}
	}
}
for(let j = 1; j <= (7-x); j++) {
	if(i-7*j >= 0 && getColorOfPiece(board, i-7*j) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i-7*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i-7*j]); }
		} else {
			mvs.push([i,i-7*j]);
		}
	}
}
for(let j = 1; j <= x; j++) {
	if(i+7*j < 64 && getColorOfPiece(board, i+7*j) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+7*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+7*j]); }
		} else {
			mvs.push([i,i+7*j]);
		}
	}
}
for(let j = 1; j <= (7-x); j++) {
	if(i+9*j < 64 && getColorOfPiece(board, i+9*j) != b) {
		if(j > 1) {
			let block = false;
			for(let k = 1; k < j; k++) {
				if(getColorOfPiece(board, i+9*k) != false) {
					block = true;
					break;
				}
			}
			if(!block) { mvs.push([i,i+9*j]); }
		} else {
			mvs.push([i,i+9*j]);
		}
	}
}
				break;
				case 'k':
if(i-7 >= 0 && getColorOfPiece(board, i-7) != b) {
	if(dif(x, toX(i-7)) < 2) {
		mvs.push([i,i-7]);
	}
}
if(i-8 >= 0 && getColorOfPiece(board, i-8) != b) {
	if(dif(x, toX(i-8)) < 2) {
		mvs.push([i,i-8]);
	}
}
if(i-9 >= 0 && getColorOfPiece(board, i-9) != b) {
	if(dif(x, toX(i-9)) < 2) {
		mvs.push([i,i-9]);
	}
}
if(i-1 >= 0 && getColorOfPiece(board, i-1) != b) {
	if(dif(x, toX(i-1)) < 2) {
		mvs.push([i,i-1]);
	}
}
if(i+7 < 64 && getColorOfPiece(board, i+7) != b) {
	if(dif(x, toX(i+7)) < 2) {
		mvs.push([i,i+7]);
	}
}
if(i+8 < 64 && getColorOfPiece(board, i+8) != b) {
	if(dif(x, toX(i+8)) < 2) {
		mvs.push([i,i+8]);
	}
}
if(i+9 < 64 && getColorOfPiece(board, i+9) != b) {
	if(dif(x, toX(i+9)) < 2) {
		mvs.push([i,i+9]);
	}
}
if(i+1 < 64 && getColorOfPiece(board, i+1) != b) {
	if(dif(x, toX(i+1)) < 2) {
		mvs.push([i,i+1]);
	}
}
if(i == 59 && deep) {
	let castling = true;
	let long_castling = true;
	let short_castling = true;
	if(game_history.length > 1) {
		for(let j = 0; j < game_history.length; j++) {
			if(j%2 == 1) {
				if(game_history[j][0] == 59) {
					castling = false;
					break;
				}
				if(game_history[j][0] == 56) {
					short_castling = false;
				}
				if(game_history[j][0] == 63) {
					long_castling = false;
				}
			}
		}
	} else {
		castling = false;
	}
	if(castling) {
		if(short_castling) {
			if(getColorOfPiece(board, i-1) == '0' && getColorOfPiece(board, i-2) == '0') {
				let halfway = getBoardAfterMove(board, i, i-1);
				if(isCheck(board, side, false) == false && isCheck(halfway, side, false) == false) {
					mvs.push([i,i-2]);
				}
			}
		}
		if(long_castling) {
			if(getColorOfPiece(board, i+1) == '0' && getColorOfPiece(board, i+2) == '0' && getColorOfPiece(board, i+3) == '0') {
				let halfway = getBoardAfterMove(board, i, i+1);
				if(isCheck(board, side, false) == false && isCheck(halfway, side, false) == false) {
					mvs.push([i,i+2]);
				}
			}
		}
	}
}
			}
		}
		if(!deep) {
			return mvs;
		} else {
			var deep_mvs = [];
			for(let i = 0; i < mvs.length; i++) {
				let copy = getBoardAfterMove(board, mvs[i][0], mvs[i][1]);
				if(!isCheck(copy, side, false)) {
					deep_mvs.push(mvs[i]);
				}
			}
			return deep_mvs;
		}
	}
	return false;
}

function controller() {
	$('#play_w').click(function() {
		depth = $('#difficulity option:selected').val();
		human_side = w;
		bot_side = b;
		reverse_board = true;
		$('#info').html("<div class='message'>Game started. Your move.</div>");
		$('#play_b').hide();
		$('#play_w').hide();
		$('#difficulity').hide();
		$('#restart').show();
		$('#undo').show();
		$('canvas').show();
		draw(gameboard);
	});
	$('#play_b').click(function() {
		depth = $('#difficulity option:selected').val();
		human_side = b;
		bot_side = w;
		reverse_board = false;
		$('#info').html("<div class='message'>Game started. Bot moves first.</div>");
		$('#play_w').hide();
		$('#play_b').hide();
		$('#difficulity').hide();
		$('#restart').show();
		$('#undo').show();
		$('canvas').show();
		draw(gameboard);
		setTimeout(botMove, 100);
	});
	$('#restart').click(function() {
		$('canvas').show();
		draw_empty();
		game_history = [];
		move_to = 'white';
		selected = false;
		gameboard = initial_position;
		$('#info').html("<div class='message'>Choose your side.</div>");
		$('#play_w').show();
		$('#play_b').show();
		$('#difficulity').show();
		$('#restart').hide();
		$('#undo').hide();
	});
	$('#undo').click(function() {
		if(game_history.length > 0) {
			let last = game_history.pop();
			gameboard = getBoardAfterMove(gameboard, last[1], last[0]);
			if(last.length > 2) {
				gameboard = gameboard.substring(0, last[1]) + last[2] + gameboard.substring(last[1]+1);
			}
			draw(gameboard);
			$('#info .message').last().remove();
		}
		if(game_history.length > 0) {
			let last = game_history.pop();
			gameboard = getBoardAfterMove(gameboard, last[1], last[0]);
			if(last.length > 2) {
				gameboard = gameboard.substring(0, last[1]) + last[2] + gameboard.substring(last[1]+1);
			}
			draw(gameboard);
			$('#info .message').last().remove();
		}
	});
	$('canvas').on('click', function(e) {
	if(move_to == human_side) {
		var x = Math.floor((e.offsetX - offset_x) / cell);
		var y = Math.floor((e.offsetY - offset_y) / cell);
		if(reverse_board) {
			var index = 63 - (y*8 + x);
		} else {
			var index = y*8 + x;
		}
		if(x >= 0 && y >= 0 && x < 8 && y < 8) {
			if(selected !== false) {
				if(getColorOfPiece(gameboard, selected) == human_side) {
					if(isMoveValid(gameboard, selected, index)) {
						if(getColorOfPiece(gameboard, index) == false) {
							game_history.push([selected, index]);
						} else {
							game_history.push([selected, index, gameboard[index]]);
						}
						gameboard = getBoardAfterMove(gameboard, selected, index);
						if(human_side == w) {
							info(gameboard[index].toUpperCase() + toX(selected, false) + toY(selected, false) + '—' + toX(index, false) + toY(index, false));
						} else {
							info('...' + gameboard[index].toUpperCase() + toX(selected, false) + toY(selected, false) + '—' + toX(index, false) + toY(index, false));
						}
						draw(gameboard);
						selected = false;
						index = -1;
						move_to = bot_side;
						setTimeout(botMove, 100);
					}
				}
			}
			if(getColorOfPiece(gameboard, index) == human_side) {
				selected = index;
				draw(gameboard);
				var mvs = getValidMoves(gameboard, human_side);
				var possible = [];
				for(let i = 0; i < mvs.length; i++) {
					if(mvs[i][0] == selected) {
						possible.push(mvs[i]);
					}
				}
				if(x%2 == 0) { rc.fillStyle = (y%2 == 0) ? white_cell : black_cell; }
				if(x%2 == 1) { rc.fillStyle = (y%2 == 0) ? black_cell : white_cell; }
				rc.fillRect(offset_x+x*cell, offset_y+y*cell, cell, cell);
				rc.fillStyle = 'rgba(255,255,255,0.8)';
				rc.fillRect(x*cell+offset_x, y*cell+offset_y, cell, cell);
				if(reverse_board) {
					drawPiece(gameboard[selected], toX(63 - selected), toY(63 - selected));
				} else {
					drawPiece(gameboard[selected], toX(selected), toY(selected));
				}
				rc.fillStyle = 'rgba(255,255,255,0.8)';
				if(reverse_board) {
					for(var i = 0; i < possible.length; i++) {
						var x = toX(63 - possible[i][1])*cell+offset_x+cell/4;
						var y = toY(63 - possible[i][1])*cell+offset_y+cell/4;
						rc.fillRect(x, y, cell/2, cell/2);
					}
				} else {
					for(var i = 0; i < possible.length; i++) {
						rc.fillRect(toX(possible[i][1])*cell+offset_x+cell/4, toY(possible[i][1])*cell+offset_y+cell/4, cell/2, cell/2);
					}
				}
			}
		}
	}});
}

var canvas = document.getElementById('game');
var rc = canvas.getContext('2d');
canvas.width = $(window).width();
canvas.height = $(window).height();

const size = $(window).height() - 80;
const offset_x = canvas.width/2-size/2;
const offset_y = 40;
const cell = size / 8;
const w = 'white';
const b = 'black';
const board_border = '#925900';
const black_cell = '#B97100';
const white_cell = '#FFC263';
const black_piece = '#70390C';
const white_piece = '#ED9D4F';

var depth = 2;
var human_side = w;
var bot_side = b;
var reverse_board = true;

var game_history = [];
var move_to = 'white';
var selected = false;

const initial_position = 'RNBKQBNRPPPPPPPP00000000000000000000000000000000pppppppprnbkqbnr';
var gameboard = initial_position;

$('canvas').show();
draw_empty();
controller();