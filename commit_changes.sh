# #!/bin/bash

# # Function to generate conventional commit message
# generate_commit_message() {
#     local file="$1"
#     local type=""

#     # Determine commit type based on file path
#     case "$file" in
#         *App.tsx)
#             type="fix(routing)"
#             message="update application routing configuration"
#             ;;
#         *dashboards/AdminLayout.tsx)
#             type="feat(admin)"
#             message="enhance admin dashboard layout"
#             ;;
#         *pages/admin/index.tsx)
#             type="feat(admin)"
#             message="update admin dashboard main page"
#             ;;
#         *pages/admin/products.tsx)
#             type="feat(admin)"
#             message="add product management page to admin dashboard"
#             ;;
#         *pages/index.tsx)
#             type="fix(landing)"
#             message="update landing page configuration"
#             ;;
#         *components/common/Modal.tsx)
#             type="feat(ui)"
#             message="add new modal component"
#             ;;
#         *pages/admin/users.tsx)
#             type="feat(admin)"
#             message="add user management page to admin dashboard"
#             ;;
#         *commit_changes.sh)
#             type="chore(ci)"
#             message="add git commit and push automation script"
#             ;;
#         *)
#             type="chore"
#             message="update ${file}"
#             ;;
#     esac

#     echo "${type}: ${message}"
# }

# # Function to check if git repository
# check_git_repo() {
#     if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
#         echo "Error: Not a git repository. Please initialize git first."
#         exit 1
#     fi
# }

# # Function to commit and push individual files
# commit_and_push_individual_files() {
#     check_git_repo

#     # Modified files
#     modified_files=(
#         "src/App.tsx"
#         "src/components/dashboards/AdminLayout.tsx"
#         "src/pages/admin/index.tsx"
#         "src/pages/admin/products.tsx"
#         "src/pages/index.tsx"
#     )

#     # Untracked files
#     untracked_files=(
#         "commit_changes.sh"
#         "src/components/common/Modal.tsx"
#         "src/pages/admin/users.tsx"
#     )

#     # Combine all files
#     all_files=("${modified_files[@]}" "${untracked_files[@]}")

#     # Process each file
#     for file in "${all_files[@]}"; do
#         if [ -f "$file" ] || [ -d "$file" ]; then
#             # Generate commit message
#             commit_message=$(generate_commit_message "$file")
            
#             # Add the file
#             git add "$file"
#             echo "Added: $file"
            
#             # Commit the file
#             git commit -m "$commit_message"
#             echo "Committed: $file with message - $commit_message"
#         else
#             echo "Warning: $file does not exist"
#         fi
#     done

#     # Push changes
#     git push origin main
#     echo "All changes have been committed and pushed successfully!"
# }

# # Run the function
# commit_and_push_individual_files




# I'll create a comprehensive script that adds, commits, and pushes each file individually with appropriate commit messages:UntitledClick to open codeHere's how to use the script:

# Save the script as commit_changes.sh
# Make it executable:
# bashCopy    chmod +x commit_changes.sh

# Run the script:
# bashCopy       ./commit_changes.sh


# Key features of the script:

# Generates conventional commit messages based on file paths
# Adds and commits each file individually
# Pushes all commits to the main branch
# Provides detailed console output
# Handles both modified and untracked files

# The commit messages follow the conventional commit standard:

# fix(routing): For routing or structural changes
# feat(admin): For new admin dashboard features
# feat(ui): For new UI components
# chore(ci): For build or CI/CD script changes

# Commit messages are generated dynamically based on the file's path and purpose.
# Would you like me to modify anything about the script?



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
        *RegisterForm.tsx)
            type="feat(auth)"
            message="enhance user registration form"
            ;;
        *pages/admin/products.tsx)
            type="feat(admin)"
            message="update product management page"
            ;;
        *pages/admin/users.tsx)
            type="feat(admin)"
            message="update user management page"
            ;;
        *commit_changes.sh)
            type="chore(ci)"
            message="update git commit and push automation script"
            ;;
        *package.json)
            type="chore(deps)"
            message="update project dependencies"
            ;;
        *package-lock.json)
            type="chore(deps)"
            message="update package lock file"
            ;;
        *pages/admin/analytics.tsx)
            type="feat(admin)"
            message="add analytics page to admin dashboard"
            ;;
        *pages/admin/inventory.tsx)
            type="feat(admin)"
            message="add inventory management page"
            ;;
        *pages/admin/orders.tsx)
            type="feat(admin)"
            message="add orders management page"
            ;;
        *pages/admin/promotions.tsx)
            type="feat(admin)"
            message="add promotions management page"
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
        "commit_changes.sh"
        "package-lock.json"
        "package.json"
        "src/App.tsx"
        "src/components/Auth/RegisterForm.tsx"
        "src/pages/admin/products.tsx"
        "src/pages/admin/users.tsx"
    )

    # Untracked files
    untracked_files=(
        "src/pages/admin/analytics.tsx"
        "src/pages/admin/inventory.tsx"
        "src/pages/admin/orders.tsx"
        "src/pages/admin/promotions.tsx"
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