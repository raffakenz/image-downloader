const inputUrl = document.querySelector("input")
const downloadBtn = document.querySelector("button")


function fetchFile(url) {
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file)
        let a = document.createElement("a")
        a.href = tempUrl

        let filename = url.split('/').pop().split('?')[0]
        if (!/\.(jpg|jpeg|png|gif|pdf|txt|docx|xlsx|pptx)$/i.test(filename)) {
            filename += ".jpg"
        }
        a.download = filename
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(tempUrl)
        downloadBtn.innerText = "Download Image"
        inputUrl.value = ""
    }).catch(() => {
        downloadBtn.innerText = "Download Image"
        alert("Terjadi kesalahan saat mengunduh file. Silakan periksa URL dan coba lagi.")
        inputUrl.value = ""
    })
}

downloadBtn.addEventListener('click', (e) => {
    e.preventDefault()
    downloadBtn.innerText = "Downloading..."
    fetchFile(inputUrl.value)
})