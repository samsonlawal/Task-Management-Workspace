import slugify from "slugify";

export const generateWorkspaceSlug = (workspaceName: string): string => {
  return slugify(workspaceName, {
    lower: true,
    // remove: /[^a-zA-Z0-9\s-]/g,
    strict: true,
    trim: true,
  });
};