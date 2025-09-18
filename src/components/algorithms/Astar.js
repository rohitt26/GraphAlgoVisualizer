class PriorityQueue {
    constructor() {
        this.elements = [];
        this.length = 0;
    }

    push(data) {
        this.elements.push(data);
        this.length++;
        this.upHeapify(this.length - 1);
    }

    pop() {
        this.swap(0, this.length - 1);
        const popped = this.elements.pop();
        this.length--;
        this.downHeapify(0);
        return popped;
    }

    upHeapify(i) {
        if (i === 0) return;
        const parent = Math.floor((i - 1) / 2);
        if (this.elements[i].cost < this.elements[parent].cost) {
            this.swap(parent, i);
            this.upHeapify(parent);
        }
    }

    downHeapify(i) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let smallest = i;

        if (left < this.length && this.elements[left].cost < this.elements[smallest].cost) {
            smallest = left;
        }
        if (right < this.length && this.elements[right].cost < this.elements[smallest].cost) {
            smallest = right;
        }
        if (smallest !== i) {
            this.swap(i, smallest);
            this.downHeapify(smallest);
        }
    }

    isEmpty() {
        return this.length === 0;
    }

    swap(x, y) {
        [this.elements[x], this.elements[y]] = [this.elements[y], this.elements[x]];
    }
}
var visitedCell = [];
var pathtoanimate = [];
var distance;

function AStar(row, col, matrix, source_coordinate, target_coordinate) {
    const pq = new PriorityQueue();
    const childparent = new Map();
    distance = Array.from({ length: row }, () => Array(col).fill(Infinity));
    distance[source_coordinate.x][source_coordinate.y] = 0;

    pq.push({ coordinate: source_coordinate, cost: 0, heuristic: heuristic(source_coordinate, target_coordinate) });
    pathtoanimate = [];
    visitedCell = [];

    while (!pq.isEmpty()) {
        const { coordinate: current, cost: distanceSoFar } = pq.pop();

        if (current.x === target_coordinate.x && current.y === target_coordinate.y) {
            getPath(childparent, target_coordinate, matrix);
            return;
        }

        visitedCell.push(matrix[current.x][current.y]);

        const neighbours = [
            { x: current.x + 1, y: current.y },
            { x: current.x, y: current.y - 1 },
            { x: current.x - 1, y: current.y },
            { x: current.x, y: current.y + 1 }
        ];

        for (const neighbour of neighbours) {
            const nx = neighbour.x;
            const ny = neighbour.y;
            const key = `${nx}-${ny}`;

            if (isValid(nx, ny, row, col) && !matrix[nx][ny].classList.contains('wall')) {
                const edgeWeight = 1;
                const distanceToNeighbour = distanceSoFar + edgeWeight;

                if (distanceToNeighbour < distance[nx][ny]) {
                    distance[nx][ny] = distanceToNeighbour;
                    const priority = distanceToNeighbour + heuristic(neighbour, target_coordinate);
                    pq.push({ coordinate: neighbour, cost: priority });
                    childparent.set(key, current);
                }
            }
        }
    }

    function heuristic(coord1, coord2) {
        return Math.abs(coord1.x - coord2.x) + Math.abs(coord1.y - coord2.y);
    }

    function isValid(nx, ny, row, col) {
        return (nx >= 0 && nx < row && ny >= 0 && ny < col);
    }
}

function getPath(childparent, target, matrix) {
    if (!target) return;
    pathtoanimate.push(matrix[target.x][target.y]);
    const parent = childparent.get(`${target.x}-${target.y}`);
    if (parent) {
        getPath(childparent, parent, matrix);
    }
}
function animate(elements, className, delay, renderState, matrix, row, col) {
    if (renderState.isrendered === true) {
        let targetpresent = false;

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains('target')) targetpresent = true;

            elements[i].classList.add('renderedvisited');

            if (i === elements.length - 1 && targetpresent) {
                for (let j = pathtoanimate.length - 1; j >= 0; j--) {
                    pathtoanimate[j].classList.remove('renderedvisited');
                    pathtoanimate[j].classList.add('renderedpath');

                    if (j === 0) {
                        renderState.isrendering = false;
                    }
                }
            }

            if (i === elements.length - 1) {
                for (let k = 0; k < row; k++) {
                    for (let l = 0; l < col; l++) {
                        if (!matrix[k][l].classList.contains('wall')) {
                            matrix[k][l].innerText = distance[k][l];
                            if (distance[k][l] === Infinity) {
                                matrix[k][l].innerText = '~';
                            }
                            if (matrix[k][l].classList.contains('target') ||
                                matrix[k][l].classList.contains('source')
                            ) { matrix[k][l].innerText = ''; }
                        }
                    }
                }
            }
        }
    } else {
        let targetpresent = false;

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains('target')) targetpresent = true;

            setTimeout(() => {
                elements[i].classList.remove('visited');
                elements[i].classList.add(className);

                if (i === elements.length - 1 && targetpresent) {
                    delay = 25;

                    for (let j = pathtoanimate.length - 1; j >= -1; j--) {
                        setTimeout(() => {
                            if (j === 0 || j === -1) {
                                renderState.isrendered = true;
                                renderState.visualizebuttonactive = true;
                                renderState.isrendering = false;
                            }

                            if (j === -1) return;

                            pathtoanimate[j].classList.remove('visited');
                            pathtoanimate[j].classList.add('path');
                        }, (Math.max(0, pathtoanimate.length - 1 - j)) * delay);
                    }

                    if (i === elements.length - 1) {
                        for (let k = 0; k < row; k++) {
                            for (let l = 0; l < col; l++) {
                                if (!matrix[k][l].classList.contains('wall')) {
                                    matrix[k][l].innerText = distance[k][l];
                                    if (distance[k][l] === Infinity) {
                                        matrix[k][l].innerText = '~';
                                    }
                                    if (matrix[k][l].classList.contains('target') ||
                                        matrix[k][l].classList.contains('source')
                                    ) { matrix[k][l].innerText = ''; }
                                }
                            }
                        }
                    }
                }
            }, delay * i);
        }
    }
}

function renderAStar({ row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState }) {
    visitedCell = [];
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            Matrix[i][j].classList.remove('path', 'visited', 'renderedpath', 'renderedvisited');
            Matrix[i][j].innerText = '';
        }
    }

    AStar(row, col, Matrix, sourcecoordinate, targetcoordinate);

    animate(visitedCell, 'visited', delay, renderState, Matrix, row, col);
}

export default renderAStar;
