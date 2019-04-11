

function verif_formulaire () {
    var msg_erreur;
    var nom = document.getElementById ('nom');
    var prenom = document.getElementById ('prenom');
    var date_naissance = document.getElementById ('date_naissance');
    var email = document.getElementById ('email');
    var commentaire = document.getElementById ('commentaire');
    
    /* Si les champs existent tous */
    if (nom == null || prenom == null || date_naissance == null || email == null || commentaire == null)
        return false;
    
    nom = nom.value;
    prenom = prenom.value;
    date_naissance = date_naissance.value;
    email = email.value;
    commentaire = commentaire.value;
    
    /* Si tous les champs sont remplis */
    if (nom.length > 0 && prenom.length > 0 && date_naissance.length > 0 && email.length > 0 && commentaire.length > 0) {
        /* Si le champs nom est correct */
        if (verif_nom_prenom (nom)) {
            /* Si le champs prenom est correct */
            if (verif_nom_prenom (prenom)) {
                /* Si le champs date_de_naissance est correct */
                if (verif_date_naissance (date_naissance)) {
                    /* Si le champs email est correct */
                    if (verif_email (email)) {
                        alert ('Message correctement envoyé');
                        return true;
                    }
                    else msg_erreur = "Email invalide";
                }
                else msg_erreur = "Date de naissance invalide";
            }
            else msg_erreur = "Prénom invalide";
        }
        else msg_erreur = "Nom invalide";
    }
    else msg_erreur = "Veuillez remplir tous les champs";
    
    alert (msg_erreur);
    
    return false;
}

function verif_nom_prenom (nom_prenom) {
    /* On crée l'expression régulière correspondante au motif d'un nom ou d'un prénom : 
     * au moins deux caractères alphabétiques insensibles à la case avec ou sans espace et tiret */
    var regexp = new RegExp("^[a-z \-]{2,}$", "i");
    
    if (regexp.test (nom_prenom))
        return true;
    
    return false;
}

function verif_date_naissance (date_naissance) {
    /* On crée l'expression régulière correspondante au motif d'une date de naissance */
    var regexp = new RegExp("^(([0-9]{2})/([0-9]{2})/([0-9]{4}))$", "");
    
    if (regexp.test (date_naissance)) {
        var nb_jours_mois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var decoupage = date_naissance.split (regexp);
        var jours   = parseInt (decoupage[2].charAt(0)) * 10 + parseInt (decoupage[2].charAt(1));
        var mois    = parseInt (decoupage[3].charAt(0)) * 10 + parseInt (decoupage[3].charAt(1));
        var annees  = parseInt (decoupage[4]);
        
        /* Si l'année est bissextile */
        if ((annees % 4 == 0 && annees % 100 != 0) || annees % 400 == 0)
            nb_jours_mois[1] = 29;
        
        /* Si la date de naissance est cohérente */
        if  (mois <= 12 && jours <= nb_jours_mois[mois-1] && annees >= 1900) {
            var now = new Date ();
            
            /* Si la date de naissance entrée est ultérieure à la date actuelle */
            if  (annees < now.getFullYear()
            || (annees == now.getFullYear() && mois < now.getMonth()+1)
            || (annees == now.getFullYear() && mois == now.getMonth()+1 && jours <= now.getDate()))
                return true;
        }
    }
    
    return false;
}

function verif_email (email) {
    /* On crée l'expression régulière correspondante au motif d'un l'email */
    var regexp = new RegExp("^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$", "");
    
    if (regexp.test (email))
        return true;
    
    return false;
}
