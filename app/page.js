import dynamic from 'next/dynamic';

const DynamicInteractiveGlobe = dynamic(() => import('./components/InteractiveGlobe'), {
  ssr: false // Disable server-side rendering
});

const Home = () => {
  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <nav style={{ height: '5vh', backgroundColor: '#0e2127', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '20px' }}>
        <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>GeoApp</span>
      </nav>
      <main style={{ minHeight: '95vh' }}>
        <DynamicInteractiveGlobe />
      </main>
    </div>
  );
};

export default Home;
