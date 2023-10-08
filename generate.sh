#!/bin/bash

cd h5p/

# Define the root directory
root_dir="videos/"

# Create the thumbnails directory if it doesn't exist
thumbnails_dir="thumbnails/"
mkdir -p "$thumbnails_dir"
rm -rf "$thumbnails_dir"/*
if ! command -v ffmpeg &>/dev/null; then
    sudo apt install ffmpeg -y >> /dev/null
fi

# Count the total number of subdirectories
num_subdirs=$(find "$root_dir" -type d | wc -l)
current_subdir_count=1

# Loop through subdirectories in the root directory
for dir in "$root_dir"*/; do
  ((current_subdir_count++))

  # Extract the category name from the subdirectory name (dropping the first two and last two characters)
  category="${dir#"$root_dir"}"
  category="${category:2:-1}"

  # Create subdirectory structure in thumbnails directory
  thumbnails_category_dir="$thumbnails_dir$category"
  mkdir -p "$thumbnails_category_dir"

  # Print the category header
  echo "#$category"

  # Loop through mp4 files in the current subdirectory
  file_count=0
  for mp4_file in "$dir"*.mp4; do
    ((file_count++))

    # Get the file name without the .mp4 extension
    title=$(basename "$mp4_file" .mp4)
    title="${title:2}"

    # Generate thumbnail filename
    thumbnail_file="$thumbnails_category_dir/$title.png"

    # Create a thumbnail in PNG format for the MP4 file using ffmpeg
    ffmpeg -i "$mp4_file" -ss 00:00:03 -vframes 1 "$thumbnail_file" >> /dev/null

    # Check if this is the last file in the last subdirectory
    if ((current_subdir_count == num_subdirs)) && ((file_count == $(ls -1 "$dir"*.mp4 | wc -l))); then
      # Print without newline
      echo -n "$mp4_file,$title,$thumbnail_file"
    else
      # Print with newline
      echo "$mp4_file,$title,$thumbnail_file"
    fi
  done
done

cd ..
