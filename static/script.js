function createTable(headers, data, heading) {
    var fullUrl = window.location.href;
    var urlParts = fullUrl.split("/");
    var standaloneSegment = urlParts[urlParts.length - 1];
    var modifiedUrl
    if (standaloneSegment == "Standalone") {
         modifiedUrl = fullUrl.replace("/Standalone", "/Consolidated");
    } else {
         modifiedUrl = fullUrl.replace("/Consolidated", "/Standalone");
    }
    console.log("Modified URL:", modifiedUrl);
    let html = `
    <div
    style="width: 100%; margin-top: 50px; height: 100%; justify-content: space-between; align-items: flex-end; display: inline-flex">
    <div
        style="flex-direction: column; justify-content: center; align-items: flex-start; gap: 8px; display: inline-flex">
        <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
            <div
                style="color: black; font-size: 24px; font-family: Lato; font-weight: 600; line-height: 31.20px; word-wrap: break-word">
                ${heading}</div>
        </div>
        <div><span
                                        style="color: #777580; font-size: 16px; font-family: Lato; font-weight: 400; line-height: 20.80px; word-wrap: break-word">Consolidated
                                        Figures in Rs.Crores / </span>
                                        <a href=${modifiedUrl} 
                                        style="text-decoration:none;color: #6669EF; font-size: 16px; font-family: Lato; font-weight: 400; line-height: 20.80px; word-wrap: break-word">View
                                        ${standaloneSegment == "Standalone" ? "Consolidated" :"Standalone"}</a></div>
    </div>
</div>
    <div style="overflow: auto; margin-top: 24px;   border: 1px #DDDDE0 solid;">
    <div style="display: flex; flex-direction:column; background-color: #F7F7F7;">
        <div class="table" style="display: flex; flex-direction:row; border-bottom: 1px #DDDDE0 solid; ">`
    headers.forEach(header => {
        header == "Type" ? html += `<div style="position:sticky; left:0; padding-left:12px;  background-color: #F7F7F7;width: 100%; height: 100%; padding-right: 12px; padding-top: 8px; padding-bottom: 8px;  justify-content: flex-start; align-items: center; gap: 24px; display: inline-flex">
                    <div style="width: 220px; color: black; font-size: 14px; font-family: Lato; font-weight: 600; line-height: 20px; word-wrap: break-word">${header}</div>
            </div>` : html += `<div
                style="background-color: #F7F7F7;width: 100%; height: 100%; padding-left: 10px; padding-right: 10px; padding-top: 8px; padding-bottom: 8px; justify-content: center; align-items: center; gap: 24px; display: inline-flex">
                <div style="width:80px; text-align: center; color: black;font-size: 14px;
    font-family: Lato;
    font-weight: 600; line-height: 20px; word-wrap: break-word">
                        ${header}</div>
            </div>`
    });
    html += `</div>`;
    data.forEach(row => {
       
            html += `
        <div class="table" style="background-color: #F7F7F7;display: flex; flex-direction:row; border-bottom: 1px #DDDDE0 solid;   ">`;
            Object.values(row).forEach((value, index) => {
            
                index == 0 ? html += ` <div
            style="position:sticky; left:0; background-color: #F7F7F7;width: 100%; height: 100%; padding-left:12px;  padding-right: 12px; padding-top: 8px; padding-bottom: 8px;   justify-content: flex-start; align-items: center; gap: 24px; display: inline-flex">
            <div
                style="width: 220px; color: #777580; font-size: 13px; font-family: Lato; font-weight: 400; line-height: 20px; word-wrap: break-word">
                ${value} </div>
        </div>`: html += `
            <div style="background-color: #F7F7F7;width: 100%; height: 100%;  padding-left: 10px; padding-right: 10px; padding-top: 8px; padding-bottom: 8px; justify-content: center; align-items: center; gap: 24px; display: inline-flex">
                <div style="width:80px; text-align: center; color: black; font-size: 14px; font-family: Lato; font-weight: 600; line-height: 20px; word-wrap: break-word">${Math.round(parseFloat(value))}</div>
            </div>`;
            });
            html += `</div>`;
        }
    );

    html += `</div>`;

    return html;
}

function createQuaterTable(headers, data, heading) {
    var fullUrl = window.location.href;
    var urlParts = fullUrl.split("/");
    var standaloneSegment = urlParts[urlParts.length - 1];
    var modifiedUrl
    if (standaloneSegment == "Standalone") {
        modifiedUrl = fullUrl.replace("/Standalone", "/Consolidated");
    } else {
        modifiedUrl = fullUrl.replace("/Consolidated", "/Standalone");
    }
    console.log("Modified URL:", modifiedUrl);
    let html = `
    <div
    style="width: 100%; margin-top: 50px; height: 100%; justify-content: space-between; align-items: flex-end; display: inline-flex">
    <div
        style="flex-direction: column; justify-content: center; align-items: flex-start; gap: 8px; display: inline-flex">
        <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
            <div
                style="color: black; font-size: 24px; font-family: Lato; font-weight: 600; line-height: 31.20px; word-wrap: break-word">
                ${heading}</div>
        </div>
        <div><span
                                        style="color: #777580; font-size: 16px; font-family: Lato; font-weight: 400; line-height: 20.80px; word-wrap: break-word">Consolidated
                                        Figures in Rs.Crores / </span> <a href=${modifiedUrl} 
                                        style="text-decoration:none;color: #6669EF; font-size: 16px; font-family: Lato; font-weight: 400; line-height: 20.80px; word-wrap: break-word">View
                                        ${standaloneSegment == "Standalone" ? "Consolidated" : "Standalone"}</a></div>
    </div>
</div>`
  
    html += `</div>`;
    html += `
    <div style=" position:relative;margin-top: 24px; overflow:auto; border: 1px #DDDDE0 solid; display: flex; flex-direction:column; background-color: #F7F7F7;">
    <div class="div1 no-scrollbar"   style="border-bottom: 1px #DDDDE0 solid; width:1600px; position: relative;  display: flex; background-color: #F7F7F7;  margin-left:12px;"> `
    headers.forEach(header => {
        header == "Type" ? html += `<div style="height:100%;  position:sticky; left:0; background-color: #F7F7F7; width: 100%; padding-left:12px; padding-right: 12px; padding-top: 8px; padding-bottom: 8px;  justify-content: flex-start; align-items: center; gap: 24px; display: inline-flex">
                    <div style="width: 220px; color: black; font-size: 14px; font-family: Lato; font-weight: 600; line-height: 20px; word-wrap: break-word">${header}</div>
            </div>` : html += `<div
                style="height:100%;  background-color: #F7F7F7; width: 100px; height: 100%; padding-left: 10px; padding-right: 10px; padding-top: 8px; padding-bottom: 8px;  justify-content: center; align-items: center; gap: 24px; display: inline-flex">
                <div style=" width:80px; text-align: center; color: black;font-size: 14px;
    font-family: Lato;
    font-weight: 600; line-height: 20px; word-wrap: break-word">
                        ${header}</div>
            </div>`
    });
    html += `</div>`;
    data.forEach((row, index2) => {
      
            html += `
    <div class="div1 no-scrollbar"  style="border-bottom: 1px #DDDDE0 solid; width:1600px; position: relative;  display: flex; flex-direction:row;margin-left:12px;">`;
            Object.values(row).forEach((value, index) => {
                index == 0 ? html += ` <div
            style="height:100%; position:sticky; left:0; background-color: #F7F7F7; width: 100%; height: 100%;padding-left:12px;   padding-right: 12px; padding-top: 8px; padding-bottom: 8px;   justify-content: flex-start; align-items: center; gap: 24px; display: inline-flex">
            <div
                style="width: 220px; color: #777580; font-size: 13px; font-family: Lato; font-weight: 400; line-height: 20px; word-wrap: break-word">
                ${value} </div>
        </div>`: html += `
            <div style="height:100%; width: 100px; height: 100%; padding-left: 10px; padding-right: 10px; padding-top: 8px; padding-bottom: 8px; justify-content: center; align-items: center; gap: 24px; display: inline-flex">
                <div style="width:80px; text-align: center; color: black; font-size: 14px; font-family: Lato; font-weight: 600; line-height: 20px; word-wrap: break-word">${Math.round(parseFloat(value))}</div>
            </div>`;
            });
            html += `</div>`;
        }
    );

    html += `</div>`;

    return html;
}

function extractDate() {
    var dateString = document.querySelector(".price-date").innerText;
    var dateOnly = dateString.split('T')[0];
    document.querySelector(".price-date").innerText = dateOnly;
}
// Call the function when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function (event) {
    extractDate();
});
// function createTable(headers, data, heading) {
//     let html = `
//     <div
//     style="width: 100%; margin-top: 50px; height: 100%; justify-content: space-between; align-items: flex-end; display: inline-flex">
//     <div
//         style="flex-direction: column; justify-content: center; align-items: flex-start; gap: 8px; display: inline-flex">
//         <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
//             <div
//                 style="color: black; font-size: 24px; font-family: Lato; font-weight: 600; line-height: 31.20px; word-wrap: break-word">
//                 ${heading}</div>
//         </div>
//         <div><span
//                                         style="color: #777580; font-size: 16px; font-family: Lato; font-weight: 400; line-height: 20.80px; word-wrap: break-word">Consolidated
//                                         Figures in Rs.Crores / </span><a
//                                         style="text-decoration:none;color: #6669EF; font-size: 16px; font-family: Lato; font-weight: 400; line-height: 20.80px; word-wrap: break-word">View
//                                         Standalone</a></div>
//     </div>
// </div>`

//     html += `</div>`;
//     html += `
//     <div style=" position:relative;margin-top: 24px; overflow:auto; border-radius: 10px;  border: 1px #DDDDE0 solid; display: flex; flex-direction:column; background-color: #F7F7F7;">
//     <div class="div1 no-scrollbar" id="1"  style=" position: relative;  display: flex; background-color: #F7F7F7; border-bottom: 1px #DDDDE0 solid;"> `
//     headers.forEach(header => {
//         header == "Type" ? html += `<div style="position:sticky; left:12px; background-color: #F7F7F7;  height: 100%; margin-left: 12px; padding-right: 12px; padding-top: 8px; padding-bottom: 8px;  justify-content: flex-start; align-items: center; gap: 24px; display: inline-flex">
//                     <div style="width: 240px; color: black; font-size: 14px; font-family: Lato; font-weight: 600; line-height: 20px; word-wrap: break-word">${header}</div>
//             </div>` : html += `<div
//                 style=" background-color: #F7F7F7; height: 100%; padding-left: 10px; padding-right: 10px; padding-top: 8px; padding-bottom: 8px;  justify-content: center; align-items: center; gap: 24px; display: inline-flex">
//                 <div style=" text-align: center; color: black;font-size: 14px;
//     font-family: Lato;
//     font-weight: 600; line-height: 20px; word-wrap: break-word">
//                         ${header}</div>
//             </div>`
//     });
//     html += `</div>`;
//     data.forEach((row, index2) => {

//         html += `
//     <div class="div1 no-scrollbar"  style="  position: relative;  display: flex; flex-direction:row; border-bottom: 1px #DDDDE0 solid; margin-left: 12px;">`;
//         Object.values(row).forEach((value, index) => {
//             index == 0 ? html += ` <div
//             style="position:sticky; left:0; background-color: #F7F7F7;  height: 100%;  padding-right: 12px; padding-top: 8px; padding-bottom: 8px;   justify-content: flex-start; align-items: center; gap: 24px; display: inline-flex">
//             <div
//                 style="width: 240px; color: #777580; font-size: 13px; font-family: Lato; font-weight: 400; line-height: 20px; word-wrap: break-word">
//                 ${value} </div>
//         </div>`: html += `
//             <div style=" height: 100%; padding-left: 10px; padding-right: 10px; padding-top: 8px; padding-bottom: 8px; justify-content: center; align-items: center; gap: 24px; display: inline-flex">
//                 <div style=" text-align: center; color: black; font-size: 14px; font-family: Lato; font-weight: 600; line-height: 20px; word-wrap: break-word">${Math.round(parseFloat(value))}</div>
//             </div>`;
//         });
//         html += `</div>`;
//     }
//     );

//     html += `</div>`;

//     return html;
// }



// function scroll() {
//     const div1 = document.getElementById('div1');
//     const div2 = document.querySelectorAll('.div2');
//     div1.scrollLeft = div2.scrollLeft 
//     const type = document.getElementsByClassName('type');
//     type.style.backgroundColor = "white";
// }

// function createTable(headers, data, ind, heading) {
//     let html = `
//     <div
//     style="width: 100%; margin-top: 50px; height: 100%; justify-content: space-between; align-items: flex-end; display: inline-flex">
//     <div
//         style="flex-direction: column; justify-content: center; align-items: flex-start; gap: 8px; display: inline-flex">
//         <div style="justify-content: flex-start; align-items: center; gap: 4px; display: inline-flex">
//             <div
//                 style="color: black; font-size: 24px; font-family: Lato; font-weight: 600; line-height: 31.20px; word-wrap: break-word">
//                 ${heading}</div>
//         </div>
//         <div><span
//                                         style="color: #777580; font-size: 16px; font-family: Lato; font-weight: 400; line-height: 20.80px; word-wrap: break-word">Consolidated
//                                         Figures in Rs.Crores / </span><a
//                                         style="text-decoration:none;color: #6669EF; font-size: 16px; font-family: Lato; font-weight: 400; line-height: 20.80px; word-wrap: break-word">View
//                                         Standalone</a></div>
//     </div>
// </div>
//     <div class="no-scrollbar" id="div1" onscroll="scrollDiv2()" style="margin-top: 24px; border-radius: 10px; overflow: auto;  background-color: #F7F7F7; border: 1px #DDDDE0 solid;display: flex;">`;
    
//         headers.forEach(header => {
//             header == "Type" ? html +=  `<div class="type" style=" background-color: #F7F7F7; width: 100%; position:sticky; left:12px; z-index: 1; height: 100%; margin-left: 12px; padding-right: 12px; padding-top: 8px; padding-bottom: 8px;  justify-content: flex-start; align-items: center; gap: 24px; display: inline-flex">
//                     <div style="width: 276px; color: black; font-size: 14px; font-family: Lato; font-weight: 600; line-height: 20px; word-wrap: break-word">${header}</div>
//             </div>` : html += `<div
//                 style=" background-color: #F7F7F7; width: 100%; height: 100%; padding-left: 10px; padding-right: 10px; padding-top: 8px; padding-bottom: 8px; justify-content: center; align-items: center; gap: 24px; display: inline-flex">
//                 <div style="width:80px; text-align: center; color: black;font-size: 14px;
//     font-family: Lato;
//     font-weight: 600; line-height: 20px; word-wrap: break-word">
//                         ${header}</div>
//                         </div>`
//         });
//     html += `</div>`;
//     html += `</div>`;
//     html += `    <div  style="display: flex; flex-direction:column;background-color: #F7F7F7; margin-top: 24px; border-radius: 10px; border: 1px #DDDDE0 solid;">
//      `
//     data.forEach(row => {
//         html += `
//         <div class="div2 no-scrollbar"  style="display: flex;overflow: auto; flex-direction:row; border-bottom: 1px #DDDDE0 solid; ">`;
//         Object.values(row).forEach((value,index) => {
//             index == 0 ? html +=` <div class="type"
//             style=" background-color: #F7F7F7; width: 100%; position:sticky; left:12px; z-index: 1; height: 100%;  padding-right: 12px; padding-top: 8px; padding-bottom: 8px;   justify-content: flex-start; align-items: center; gap: 24px; display: inline-flex">
//             <div
//                 style="width: 276px; color: #777580; font-size: 13px; font-family: Lato; font-weight: 400; line-height: 20px; word-wrap: break-word">
//                 ${value} </div>
//         </div>`:html += `
//             <div style=" background-color: #F7F7F7; width: 100%; height: 100%; padding-left: 10px; padding-right: 10px; padding-top: 8px; padding-bottom: 8px; justify-content: center; align-items: center; gap: 24px; display: inline-flex">
//                 <div style="width: 80px;text-align: center; color: black; font-size: 14px; font-family: Lato; font-weight: 600; line-height: 20px; word-wrap: break-word">${Math.round(parseFloat(value)) }</div>
//             </div>`;
//         });
//         html += `</div>`;
//     });
//     html += `</div>`;

//     return html;
// }