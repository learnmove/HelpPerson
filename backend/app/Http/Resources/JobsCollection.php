<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\JobsResource;
class JobsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
        protected $withoutFields = [];

    public function toArray($request)
    {
        return $this->processCollection($request);
    }
    public function hide(array $fields)
    {
        $this->withoutFields = $fields;
        return $this;
    }
    /**
     * Send fields to hide to UsersResource while processing the collection.
     * 
     * @param $request
     * @return array
     */
    protected function processCollection($request)
    {
        return $this->collection->map(function ( $resource) use ($request) {
            return $resource->hide($this->withoutFields)->toArray($request);
        })->all();
    }
}
