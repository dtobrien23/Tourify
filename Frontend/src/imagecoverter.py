from PIL import Image
import os

def resize_images(input_dir, output_dir, size):
    for filename in os.listdir(input_dir):
        if filename.endswith(".jpeg") or filename.endswith(".jpg"):
            image_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)
            
            img = Image.open(image_path)
            resized_img = img.resize(size)
            resized_img.save(output_path)
            print(f"Resized image: {filename}")

# Example usage
input_directory = "/Users/deanobrien/Desktop/Tourify/images/jimmy"
output_directory = "/Users/deanobrien/Desktop/Tourify/images/attractions-resized"
target_size = (225, 225)

resize_images(input_directory, output_directory, target_size)
