# Serpentine Odyssey Game Code

import pygame
import random

# Initialize pygame
pygame.init()

# Define colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# Set screen width and height
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

# Set snake and food size
BLOCK_SIZE = 20

# Set game speed
FPS = 10

# Initialize screen
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Serpentine Odyssey")

# Set clock
clock = pygame.time.Clock()

# Define snake's initial position and length
snake = [(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2)]
snake_direction = (1, 0)

# Define food's initial position
food = (random.randint(0, SCREEN_WIDTH / BLOCK_SIZE - 1) * BLOCK_SIZE,
        random.randint(0, SCREEN_HEIGHT / BLOCK_SIZE - 1) * BLOCK_SIZE)

# Define game over flag
game_over = False

# Game main loop
while not game_over:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            game_over = True
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT and snake_direction != (1, 0):
                snake_direction = (-1, 0)
            elif event.key == pygame.K_RIGHT and snake_direction != (-1, 0):
                snake_direction = (1, 0)
            elif event.key == pygame.K_UP and snake_direction != (0, 1):
                snake_direction = (0, -1)
            elif event.key == pygame.K_DOWN and snake_direction != (0, -1):
                snake_direction = (0, 1)

    # Move snake's head
    new_head = ((snake[0][0] + snake_direction[0] * BLOCK_SIZE) % SCREEN_WIDTH,
                (snake[0][1] + snake_direction[1] * BLOCK_SIZE) % SCREEN_HEIGHT)

    # Check if the game is over
    if new_head in snake[1:] or new_head[0] < 0 or new_head[0] >= SCREEN_WIDTH \
            or new_head[1] < 0 or new_head[1] >= SCREEN_HEIGHT:
        game_over = True

    # Update snake's position
    snake.insert(0, new_head)

    # Check if food is eaten
    if new_head == food:
        food = (random.randint(0, SCREEN_WIDTH / BLOCK_SIZE - 1) * BLOCK_SIZE,
                random.randint(0, SCREEN_HEIGHT / BLOCK_SIZE - 1) * BLOCK_SIZE)
    else:
        snake.pop()

    # Draw screen
    screen.fill(BLACK)
    for segment in snake:
        pygame.draw.rect(screen, GREEN, (segment[0], segment[1], BLOCK_SIZE, BLOCK_SIZE))
    pygame.draw.rect(screen, RED, (food[0], food[1], BLOCK_SIZE, BLOCK_SIZE))
    pygame.display.flip()

    # Control game speed
    clock.tick(FPS)

# Quit pygame
pygame.quit()
