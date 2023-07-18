import json
from PIL import Image, ImageDraw, ImageFont

# Load the badges JSON file
with open('badges.json') as file:
    badges = json.load(file)

# Set the dimensions for the badge image
width, height = 300, 300

# Define the font and font size for the badge name
font = ImageFont.truetype("arial.ttf", 30)

# Iterate over each badge and generate the badge image
for badge in badges:
    # Create a blank image for the badge
    image = Image.new('RGB', (width, height), color='white')
    draw = ImageDraw.Draw(image)

    # Draw the badge name on the image
    text_width, text_height = draw.textsize(badge['name'], font=font)
    text_x = (width - text_width) // 2
    text_y = (height - text_height) // 2
    draw.text((text_x, text_y), badge['name'], fill='black', font=font)

    # Save the badge image with the badge name as the filename
    filename = badge['name'].replace(' ', '_').lower() + '.png'
    image.save('badgeimages/' + filename)

    print(f"Generated badge image: {filename}")
