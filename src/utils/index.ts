export function random(min: number, max: number) {
    return Math.floor(min + Math.random() * ((max + 1) - min))
}


export function fileAsDataUrl(file: File) {
    const render = new FileReader()
    return new Promise<string>((resolve, reject) => {
        render.readAsDataURL(file)
        render.onload = (data) => {
            if (data.target?.result && typeof data.target.result == 'string') {
                resolve(data.target.result)
            } else {
                reject('解析失败')
            }

        }
        render.onerror = (e) => {
            reject(e)
        }
    })
}