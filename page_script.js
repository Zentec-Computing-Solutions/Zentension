if (typeof $ !== "undefined" && typeof $.fn.modal !== "undefined") {
    if (typeof populatePDF === "function") {
        $("#PDFModal").modal("show");
        populatePDF("label");
    } else {
        console.error(
            "Zenstension Error: populatePDF function is not defined on the page."
        );
    }
} else {
    console.error(
        "Zenstension Error: jQuery or Bootstrap modal is not available on the page."
    );
}
