(() => {
    const form = document.querySelector("form")
    const select = document.querySelector("select")
    const org_text = document.querySelector("input")
    let result = document.querySelector("#result")

    const fetchResult = () => {
        fetch("/all").then(res => res.json()).then(data => {
            console.log(data)
            renderResult(data)
        })
    }

    fetchResult()

    const renderResult = (data) => {
        data.forEach( ({orgText, transText, langCode}) => {
            let li = document.createElement("li")
            li.innerText = `${orgText} - ${transText} - ${langCode}`

            result.appendChild(li)
        });
    }

    form.addEventListener("submit", e => {
        try {
            e.preventDefault()

            console.log(org_text)

            fetch(`/translate`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orgText: org_text.value,
                    langCode: select.value
                })
            })
                .then(res => res.json())
                .then(data => { 
                    if(!data) {
                        console.log("Something went wrong!")
                        return
                    }
                    
                    let tran_text = data.result[0].translations[0].text
                    
                    console.log("Translated Text : ", tran_text)

                    window.location.reload()
                }, console.error)
        } catch (e) {
            console.log("Error While  submiting the form : ", e)
        }

    })

})()