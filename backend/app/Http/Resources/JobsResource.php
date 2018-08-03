<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\JobsCollection;
class JobsResource extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
        protected $withoutFields = [];
   public static function collection($resource)
    {
        return tap(new JobsCollection($resource), function ($collection) {
            $collection->collects = __CLASS__;
        });
    }
    public function toArray($request)
    {
        return $this->filterFields(['id'=>$this->id]);
    }
  public function hide(array $fields)
    {
        $this->withoutFields = $fields;
        return $this;
    }
    protected function filterFields($array)
    {
        return collect($array)->forget($this->withoutFields)->toArray();
    }
}
