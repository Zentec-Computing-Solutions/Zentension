// copy_buttons.js
// Provides addCopyButtons(headerKeywords)

function addCopyButtons(headerKeywords = ["customer"]) {
    // Helper to extract visible text from a cell, excluding our copy UI
    function extractVisibleText(cell) {
        if (!cell) return "";
        const clone = cell.cloneNode(true);
        clone
            .querySelectorAll(
                ".zenstension-copy-btn, .zenstension-copy-feedback"
            )
            .forEach((n) => n.remove());
        return clone.innerText.replace(/\s+/g, " ").trim();
    }

    function writeToClipboard(text) {
        if (!text) return Promise.resolve();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise((resolve, reject) => {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.left = "-9999px";
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            try {
                const ok = document.execCommand("copy");
                document.body.removeChild(ta);
                if (ok) resolve();
                else reject(new Error("copy command failed"));
            } catch (err) {
                document.body.removeChild(ta);
                reject(err);
            }
        });
    }

    function showFeedback(button) {
        const icon = button.querySelector(".zenstension-copy-icon");
        if (!icon) return;
        const origClasses = icon.className;
        icon.className =
            "fas fa-check zenstension-copy-icon zenstension-copy-checked";
        setTimeout(() => {
            icon.className = origClasses;
        }, 900);
    }

    // Add minimal styles for copy button (only once)
    if (!document.getElementById("zenstension-copy-styles")) {
        const style = document.createElement("style");
        style.id = "zenstension-copy-styles";
        style.textContent = `
            .zenstension-copy-btn { margin-left: 8px; padding: 2px 6px; font-size: 12px; cursor: pointer; background: transparent; border: none; }
            .zenstension-copy-btn:active { transform: translateY(1px); }
            .zenstension-copy-icon { font-size: 12px; color: inherit; transition: color 150ms ease, transform 150ms ease, opacity 150ms ease; }
            .zenstension-copy-checked { color: #28a745 !important; }
        `;
        document.head.appendChild(style);
    }

    // include all tables so pages that use different table classes (e.g. `fit vtop`) are matched
    const tables = Array.from(document.querySelectorAll("table"));
    if (!tables || tables.length === 0) return false;

    // Filter to the specific table(s) that contain any of the provided header keywords
    const targetTables = tables.filter((table) => {
        const ths = Array.from(table.querySelectorAll("th"));
        return ths.some((th) => {
            const txt = (th.textContent || "").trim().toLowerCase();
            return headerKeywords.some((kw) => txt === kw || txt.includes(kw));
        });
    });
    if (targetTables.length === 0) return false;

    targetTables.forEach((table) => {
        const rows = table.querySelectorAll("tbody > tr");
        if (!rows) return;
        rows.forEach((row) => {
            try {
                const cell = row.querySelector("td");
                if (!cell) return;
                if (cell.querySelector(".zenstension-copy-btn")) return;

                const copyBtn = document.createElement("button");
                copyBtn.type = "button";
                copyBtn.className =
                    "btn btn-default btn-xs zenstension-copy-btn";
                copyBtn.innerHTML =
                    '<i class="fas fa-copy zenstension-copy-icon" aria-hidden="true"></i>';
                copyBtn.setAttribute("aria-label", "Copy this field");
                copyBtn.title = "Copy this field";

                copyBtn.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    const text = extractVisibleText(cell);
                    writeToClipboard(text)
                        .then(() => showFeedback(copyBtn))
                        .catch(() => showFeedback(copyBtn));
                });

                cell.appendChild(copyBtn);
            } catch (err) {
                console.warn(
                    "Zenstension: Failed to add copy button for row",
                    err
                );
            }
        });
    });

    return true;
}
