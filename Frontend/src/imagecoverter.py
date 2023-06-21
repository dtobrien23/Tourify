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
input_directory = "C://Users//35385//Desktop//image_test"
output_directory = "C://Users//35385//Desktop//image_out"
target_size = (1536, 1152)

resize_images(input_directory, output_directory, target_size)
