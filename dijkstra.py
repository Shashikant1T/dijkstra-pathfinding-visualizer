import heapq
import math

def dijkstra(grid, start, end, diagonal=False):
    rows, cols = len(grid), len(grid[0])

    distances = [[float("inf")] * cols for _ in range(rows)]
    distances[start[0]][start[1]] = 0

    pq = [(0, start)]
    came_from = {}

    visited = set()
    visited_order = []

    directions_4 = [(1,0,1), (-1,0,1), (0,1,1), (0,-1,1)]
    directions_8 = directions_4 + [
        (1,1,math.sqrt(2)), (1,-1,math.sqrt(2)),
        (-1,1,math.sqrt(2)), (-1,-1,math.sqrt(2))
    ]

    directions = directions_8 if diagonal else directions_4

    while pq:
        curr_dist, (r, c) = heapq.heappop(pq)

        if (r, c) in visited:
            continue
        visited.add((r, c))

        if (r, c) != start:
            visited_order.append((r, c))

        if (r, c) == end:
            return {
                "visited": visited_order,
                "path": reconstruct_path(came_from, end)
            }

        for dr, dc, cost in directions:
            nr, nc = r + dr, c + dc

            if not (0 <= nr < rows and 0 <= nc < cols):
                continue
            if grid[nr][nc] == 1:
                continue

            if diagonal and abs(dr) == 1 and abs(dc) == 1:
                if grid[r][nc] == 1 or grid[nr][c] == 1:
                    continue

            new_dist = curr_dist + cost
            if new_dist < distances[nr][nc]:
                distances[nr][nc] = new_dist
                came_from[(nr, nc)] = (r, c)
                heapq.heappush(pq, (new_dist, (nr, nc)))

    return {"visited": visited_order, "path": []}

def reconstruct_path(came_from, end):
    path = []
    current = end
    while current in came_from:
        path.append(current)
        current = came_from[current]
    return path[::-1]
