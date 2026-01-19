import { redirect } from 'next/navigation';

// Deprecated route.
// We keep this file only to avoid breaking older links while we finalize route cleanup.
// Canonical deep-link route is /gallery/[id].
export default function DeprecatedGalleryCatchAll() {
  redirect('/gallery');
}
