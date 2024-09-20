import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const origins = searchParams.get('origins');
    const destinations = searchParams.get('destinations');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}`);
        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar dados do Google Maps API:', error);
        return NextResponse.json({ error: 'Erro ao buscar dados do Google Maps API' }, { status: 500 });
    }
}
