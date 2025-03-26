export function generateCategoryId(name) {
  return name
    .toLowerCase() // Convert to lowercase
    .normalize('NFD') // Normalize to separate accent from letters
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/đ/g, 'd') // Convert 'đ' to 'd'
    .replace(/[^a-z0-9\s]/g, '') // Remove all non-alphanumeric characters except spaces
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}
