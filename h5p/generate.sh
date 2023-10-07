#!/bin/bash

# Define the root directory
root_dir="videos/"

# Count the total number of subdirectories
num_subdirs=$(find "$root_dir" -type d | wc -l)
current_subdir_count=1

# Loop through subdirectories in the root directory
for dir in "$root_dir"*/; do
  ((current_subdir_count++))
  
  # Extract the category name from the subdirectory name (dropping the first two and last two characters)
  category="${dir#"$root_dir"}"
  category="${category:2:-1}"
  
  # Print the category header
  echo "#$category"

  # Loop through mp4 files in the current subdirectory
  file_count=0
  for mp4_file in "$dir"*.mp4; do
    ((file_count++))
    # Get the file name without the .mp4 extension
    title=$(basename "$mp4_file" .mp4)
    # Check if this is the last file in the last subdirectory
    if ((current_subdir_count == num_subdirs)) && ((file_count == $(ls -1 "$dir"*.mp4 | wc -l))); then
      # Print without newline
      echo -n "$mp4_file,$title"
    else
      # Print with newline
      echo "$mp4_file,$title"
    fi
  done
done
