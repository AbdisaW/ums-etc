

// /middlewares/rbac.middleware.js

export function authorize(roles = []) {
  return (req, res, next) => {
    const user = req.user;
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: req.__('errors.forbidden') });
    }

    // 🔒 Librarian must be approved
    if (user.role === "LIBRARIAN" && !user.approved) {
      return res.status(403).json({ error: "Librarian not approved by admin yet" });
    }
    next();
  };
}



// New middleware specifically for admin
export function isAdmin(req, res, next) {
    if (req.user.role !== "ADMIN") {
        
        return res.status(403).json({ error: req.__("errors.forbidden") });
    }
    next();
}


// New middleware specifically for librarian (approved)
// export function isApprovedLibrarian(req, res, next) {
//     if (req.user.role !== "LIBRARIAN" || !req.user.approved) {
//         return res.status(403).json({ error: req.__("errors.forbidden") });
//     }
//     next();
// }
