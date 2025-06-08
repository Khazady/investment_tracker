import { redirect } from 'next/navigation';

export default function IndexPage() {
  //if not logged in - redirect to signin
  redirect('/dashboard');
}
