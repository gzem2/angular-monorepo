<?php

use Laravel\Lumen\Testing\DatabaseMigrations;

class ArticleTest extends TestCase
{
    use DatabaseMigrations;

    public function test_create_article()
    {
        $this->json('POST', '/api/v1/article', ['title' => 'Title', 'content' => 'Content'])
            ->seeJson([
                'title' => 'Title',
                'content' => 'Content'
            ]);
    }

    public function test_read_article()
    {
        $this->json('POST', '/api/v1/article', ['title' => 'Title', 'content' => 'Content']);

        $this->json('GET', '/api/v1/article/1')
            ->seeJson([
                'id' => 1,
                'title' => 'Title',
                'content' => 'Content'
            ]);
    }

    public function test_update_article()
    {
        $this->json('POST', '/api/v1/article', ['title' => 'Title', 'content' => 'Content'])
            ->seeJson([
                'id' => 1,
                'title' => 'Title',
                'content' => 'Content'
            ]);

        $this->json('PUT', '/api/v1/article/1', ['id' => 1, 'title' => 'NewTitle', 'content' => 'NewContent'])
            ->seeJson([
                'id' => 1,
                'title' => 'NewTitle',
                'content' => 'NewContent'
            ]);
    }

    public function test_destroy_article()
    {
        $this->json('POST', '/api/v1/article', ['title' => 'Title', 'content' => 'Content']);

        $this->json('GET', '/api/v1/article/1')->seeJson(['id' => 1]);

        $this->json('DELETE', '/api/v1/article/1');

        $this->json('GET', '/api/v1/article/1')->seeJsonDoesntContains(['id' => 1]);
    }
}
