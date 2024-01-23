const handleCleanUsers = async()=>{
    try {
        const response = await fetch("api/users", {
            method: "DELETE"
        })
        if(response.status === 200){
            // document.location.replace("/");
            window.location.reload()
        }else{
            alert('Failed to delete users');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
const handleChangeRole = async(userId) => {
    const form = document.getElementById(`changeRoleForm-${userId}`);
    const newRole = form.newRole.value;
    try {
        const response = await fetch(`/api/users/change-role/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newRole }),
        });
        if (response.status === 200) {
            window.location.reload()
        } else {
            console.error('Failed to change role');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

const handleDeleteUser = async(userId) => {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
        });
        if (response.status === 200) {
            window.location.reload()
        } else {
            console.error('Failed to delete user');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}