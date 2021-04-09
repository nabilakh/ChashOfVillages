module.exports = (err, req, res, next) => {
    let code;
    let name = err.name;
    let message;

    switch (name) {
        case "Missing_Token":
            code = 401;
            message = "Akses Token Hilang"
            break;
        case "Not_Enough":
            code = 409;
            message = "Resources is not enough!";
            break;
        case "Not_Found":
            code = 404;
            message = "Resource Access not found";
            break;
        case "Gold_Empty":
            code = 409;
            message = "Mohon tunggu, Gold masih kosong !";
            break;
        case "Max_Barrack":
            code = 409;
            message = "Pembuatan barrack sudah mencapai maksimum !";
            break;
        case "Not_Found_User":
            code = 404;
            message = "User ID tidak ditemukan";
            break;
        case "Phohibited":
            code = 409;
            message = "Maaf, tidak bisa menyerang musuh ini !";
            break;

    }
    res.status(code).json({
        success: false,
        message
    })
}