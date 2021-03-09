<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;


class ArticleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function index()
    {

        $articles = Article::orderBy('id', 'desc')->offset(0)->limit(10)->get();;

        return response()->json($articles);
    }

    public function page()
    {
        $articles = Article::orderBy('id', 'desc')->paginate(10);

        return response()->json($articles);
    }

    public function create(Request $request)
    {
        $article = new Article;

        $article->title = $request->title;
        $article->content = $request->content;

        $article->save();

        return response()->json($article);
    }

    public function show($id)
    {
        $article = Article::find($id);

        return response()->json($article);
    }

    public function update(Request $request, $id)
    {
        $article = Article::find($id);

        $article->title = $request->input('title');
        $article->content = $request->input('content');
        $article->save();
        return response()->json($article);
    }

    public function destroy($id)
    {
        $article = Article::find($id);
        $article->delete();

        return response()->json('article removed successfully');
    }
}
