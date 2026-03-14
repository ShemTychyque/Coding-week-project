/* ═══════════════════════════════════════════════════════════
   PediAppend – history.js
   Script spécifique à la page d'historique (history.html).
   Gère : suppression d'un enregistrement, effacement complet
   de l'historique, et filtrage côté client.
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

    /* ═══ SUPPRESSION D'UN ENREGISTREMENT ═══ */
    /* Fonction globale car appelée via onclick dans le HTML */
    window.deleteRecord = function(id) {
        if (!confirm('Supprimer cet enregistrement ?')) return;
        fetch('/history/' + encodeURIComponent(id), { method: 'DELETE' })
            .then(r => { if (r.ok) location.reload(); });
    };

    /* ═══ EFFACEMENT COMPLET DE L'HISTORIQUE ═══ */
    window.clearHistory = function() {
        if (!confirm('Effacer tout l\'historique ? Cette action est irréversible.')) return;
        fetch('/history/clear', { method: 'POST' })
            .then(r => { if (r.ok) location.reload(); });
    };

    /* ═══ FILTRAGE CÔTÉ CLIENT ═══ */
    /* Filtre les lignes du tableau par texte de recherche et type de résultat */
    window.filterRecords = function() {
        const q = (document.getElementById('searchInput')?.value || '').toLowerCase();
        const f = document.getElementById('filterResult')?.value || 'all';
        let anyVisible = false;
        document.querySelectorAll('#historyTable tbody tr').forEach(tr => {
            const text = tr.textContent.toLowerCase();
            const result = tr.dataset.result;
            const matchText = !q || text.includes(q);
            const matchFilter = f === 'all' || result === f;
            const show = matchText && matchFilter;
            tr.style.display = show ? '' : 'none';
            if (show) anyVisible = true;
        });
        const empty = document.getElementById('filterEmpty');
        if (empty) empty.hidden = anyVisible;
    };

    // Initialize empty-state for filters on first render.
    if (document.getElementById('historyTable')) window.filterRecords();

});
