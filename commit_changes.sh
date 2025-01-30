#!/bin/bash

# Function to generate conventional commit message
generate_commit_message() {
    local file="$1"
    local type=""

    # Determine commit type based on file path
    case "$file" in
        *App.tsx)
            type="fix(routing)"
            message="update application routing configuration"
            ;;
        *dashboards/AdminLayout.tsx)
            type="feat(admin)"
            message="enhance admin dashboard layout"
            ;;
        *pages/admin/index.tsx)
            type="feat(admin)"
            message="update admin dashboard main page"
            ;;
        *pages/admin/products.tsx)
            type="feat(admin)"
            message="add product management page to admin dashboard"
            ;;
        *pages/index.tsx)
            type="fix(landing)"
            message="update landing page configuration"
            ;;
        *components/common/Modal.tsx)
            type="feat(ui)"
            message="add new modal component"
            ;;
        *pages/admin/users.tsx)
            type="feat(admin)"
            message="add user management page to admin dashboard"
            ;;
        *commit_changes.sh)
            type="chore(ci)"
            message="add git commit and push automation script"
            ;;
        *)
            type="chore"
            message="update ${file}"
            ;;
    esac

    echo "${type}: ${message}"
}

# Function to check if git repository
check_git_repo() {
    if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
        echo "Error: Not a git repository. Please initialize git first."
        exit 1
    fi
}

# Function to commit and push individual files
commit_and_push_individual_files() {
    check_git_repo

    # Modified files
    modified_files=(
        "src/App.tsx"
        "src/components/dashboards/AdminLayout.tsx"
        "src/pages/admin/index.tsx"
        "src/pages/admin/products.tsx"
        "src/pages/index.tsx"
    )

    # Untracked files
    untracked_files=(
        "commit_changes.sh"
        "src/components/common/Modal.tsx"
        "src/pages/admin/users.tsx"
    )

    # Combine all files
    all_files=("${modified_files[@]}" "${untracked_files[@]}")

    # Process each file
    for file in "${all_files[@]}"; do
        if [ -f "$file" ] || [ -d "$file" ]; then
            # Generate commit message
            commit_message=$(generate_commit_message "$file")
            
            # Add the file
            git add "$file"
            echo "Added: $file"
            
            # Commit the file
            git commit -m "$commit_message"
            echo "Committed: $file with message - $commit_message"
        else
            echo "Warning: $file does not exist"
        fi
    done

    # Push changes
    git push origin main
    echo "All changes have been committed and pushed successfully!"
}

# Run the function
commit_and_push_individual_files